#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <time.h>
#include <Preferences.h>
#include "esp_system.h"

// -------------------- OLED (SSD1306 I2C) --------------------
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// OLED I2C remap (so RFID RST can stay on 22)
#define I2C_SDA 25
#define I2C_SCL 26

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_ADDR 0x3C

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
bool oledOk = false;

// What we show on OLED
String oledBackendText = "API: waiting";
String oledUidText = "";
uint32_t lastBackendHealthMs = 0;
uint32_t lastScannerIdLogMs = 0;

// -------------------- DEVICE + WIFI --------------------
const char* DEVICE_NAME = "IMPRINT";
//const char* WIFI_SSID   = "Sigma Chi";
//const char* WIFI_PASS   = "EtaDelta1970";
const char* WIFI_SSID   = "EagleNet";
const char* WIFI_PASS   = "vnbhEB5D";

// -------------------- BACKEND -------------------- // replace the IP address with your local IP. i have two so you can have your home and school on the same code
//const char* BACKEND_HEALTH_URL = "http://192.168.99.31:8080/health";
//const char* BACKEND_SCAN_URL   = "http://192.168.99.31:8080/api/event/scan";
const char* BACKEND_HEALTH_BASE_URL = "http://10.143.138.216:8080/health";
const char* BACKEND_SCAN_URL   = "http://10.143.138.216:8080/api/event/scan";
String SCANNER_ID = "";
String BACKEND_HEALTH_URL = "";
static const uint32_t BACKEND_HEALTH_INTERVAL_MS = 1000;

// -------------------- TIME (America/Chicago) --------------------
const char* TZ_INFO = "CST6CDT,M3.2.0/2,M11.1.0/2";
const char* NTP1 = "pool.ntp.org";
const char* NTP2 = "time.nist.gov";

// -------------------- PINS --------------------
#define SS_PIN     5
#define RST_PIN    22
#define BUZZER_PIN 27

// RGB LED pins (you said: Red 14, Green 12, Blue 13)
#define RGB_R_PIN 14
#define RGB_G_PIN 12
#define RGB_B_PIN 13

// If your RGB LED is common ANODE (active-low), set this to true
const bool RGB_ACTIVE_LOW = false;

MFRC522 rfid(SS_PIN, RST_PIN);
Preferences prefs;
bool scannerIdCreatedThisBoot = false;

// -------------------- ACTIVE BUZZER (ACTIVE-LOW) --------------------
const uint32_t BUZZ_MS = 100;
bool buzzerOn = false;
uint32_t buzzerOffAt = 0;

void startBeep(uint32_t durationMs) {
  digitalWrite(BUZZER_PIN, LOW);   // ON
  buzzerOn = true;
  buzzerOffAt = millis() + durationMs;
}
void updateBuzzer() {
  if (buzzerOn && (int32_t)(millis() - buzzerOffAt) >= 0) {
    digitalWrite(BUZZER_PIN, HIGH); // OFF
    buzzerOn = false;
  }
}

// -------------------- RGB FLASH (NON-BLOCKING) --------------------
bool greenOn = false;
uint32_t greenOffAt = 0;
bool redOn = false;
uint32_t redOffAt = 0;
bool blueOn = false;
uint32_t blueOffAt = 0;
bool yellowOn = false;
uint32_t yellowOffAt = 0;
bool targetedMode = false;
bool registeredMode = false;
bool purpleFlashOn = false;
bool purpleFlashVisible = false;
uint32_t purpleFlashNextMs = 0;

const uint32_t PURPLE_FLASH_ON_MS = 90;
const uint32_t PURPLE_FLASH_OFF_MS = 90;

void rgbWrite(bool r, bool g, bool b) {
  auto lvl = [](bool on) -> uint8_t {
    if (RGB_ACTIVE_LOW) return on ? LOW : HIGH;  // common anode
    return on ? HIGH : LOW;                      // common cathode
  };

  digitalWrite(RGB_R_PIN, lvl(r));
  digitalWrite(RGB_G_PIN, lvl(g));
  digitalWrite(RGB_B_PIN, lvl(b));
}

void startGreenFlash(uint32_t durationMs) {
  rgbWrite(false, true, false); // green only
  greenOn = true;
  greenOffAt = millis() + durationMs;
}

void updateGreenFlash() {
  if (greenOn && (int32_t)(millis() - greenOffAt) >= 0) {
    rgbWrite(false, false, false); // all off
    greenOn = false;
  }
}

void startRedFlash(uint32_t durationMs) {
  rgbWrite(true, false, false); // red only
  redOn = true;
  redOffAt = millis() + durationMs;
}

void updateRedFlash() {
  if (redOn && (int32_t)(millis() - redOffAt) >= 0) {
    rgbWrite(false, false, false); // all off
    redOn = false;
  }
}

void startBlueFlash(uint32_t durationMs) {
  rgbWrite(false, false, true); // blue only
  blueOn = true;
  blueOffAt = millis() + durationMs;
}

void updateBlueFlash() {
  if (blueOn && (int32_t)(millis() - blueOffAt) >= 0) {
    rgbWrite(false, false, false); // all off
    blueOn = false;
  }
}

void startYellowFlash(uint32_t durationMs) {
  rgbWrite(true, true, false); // yellow (red + green)
  yellowOn = true;
  yellowOffAt = millis() + durationMs;
}

void updateYellowFlash() {
  if (yellowOn && (int32_t)(millis() - yellowOffAt) >= 0) {
    yellowOn = false;
    if (purpleFlashOn) {
      rgbWrite(purpleFlashVisible, false, purpleFlashVisible); // restore purple state
    } else if (!greenOn && !redOn && !blueOn) {
      rgbWrite(false, false, false); // all off
    }
  }
}

bool parseBoolLikeFieldFromHealth(const String& payload, const String& field, bool& out) {
  const String key = "\"" + field + "\"";
  int keyIdx = payload.indexOf(key);
  if (keyIdx < 0) return false;

  int colonIdx = payload.indexOf(':', keyIdx + key.length());
  if (colonIdx < 0) return false;

  int valIdx = colonIdx + 1;
  while (valIdx < (int)payload.length()) {
    char c = payload.charAt(valIdx);
    if (c != ' ' && c != '\t' && c != '\n' && c != '\r') break;
    valIdx++;
  }

  if (valIdx + 4 <= (int)payload.length() && payload.substring(valIdx, valIdx + 4) == "true") {
    out = true;
    return true;
  }
  if (valIdx + 5 <= (int)payload.length() && payload.substring(valIdx, valIdx + 5) == "false") {
    out = false;
    return true;
  }
  char first = payload.charAt(valIdx);
  if (first == '1') {
    out = true;
    return true;
  }
  if (first == '0') {
    out = false;
    return true;
  }
  return false;
}

void startPurpleRapidFlash() {
  if (purpleFlashOn) return;
  purpleFlashOn = true;
  purpleFlashVisible = true;
  purpleFlashNextMs = millis();
  rgbWrite(true, false, true); // purple
}

void stopPurpleRapidFlash() {
  purpleFlashOn = false;
  purpleFlashVisible = false;
  if (!greenOn && !redOn && !blueOn) {
    rgbWrite(false, false, false); // all off
  }
}

void updatePurpleRapidFlash() {
  if (!purpleFlashOn) return;
  if ((int32_t)(millis() - purpleFlashNextMs) >= 0) {
    purpleFlashVisible = !purpleFlashVisible;
    purpleFlashNextMs = millis() + (purpleFlashVisible ? PURPLE_FLASH_ON_MS : PURPLE_FLASH_OFF_MS);
    rgbWrite(purpleFlashVisible, false, purpleFlashVisible); // purple
  }
}

void applyTargetedState(bool newTargeted) {
  if (newTargeted && !targetedMode) {
    startPurpleRapidFlash();
    startBeep(120);
    Serial.println("Backend targeting confirmed: true");
  } else if (!newTargeted && targetedMode) {
    stopPurpleRapidFlash();
    Serial.println("Backend targeting ended: false");
  }
  targetedMode = newTargeted;
}

void applyRegisteredState(bool newRegistered) {
  if (newRegistered && !registeredMode) {
    if (!targetedMode) {
      startYellowFlash(700);
    }
    Serial.println("Backend registered confirmed: true");
  } else if (!newRegistered && registeredMode) {
    Serial.println("Backend registered ended: false");
  }
  registeredMode = newRegistered;
}

// -------------------- RFID ANTI-REPEAT --------------------
String lastSeenUid = "";
uint32_t lastSeenAt = 0;
const uint32_t SCAN_COOLDOWN_MS = 1500;

// -------------------- HELPERS --------------------
String genUUIDv4() {
  uint8_t b[16];
  for (int i = 0; i < 16; i += 4) {
    uint32_t r = esp_random();
    b[i + 0] = (r >> 0) & 0xFF;
    b[i + 1] = (r >> 8) & 0xFF;
    b[i + 2] = (r >> 16) & 0xFF;
    b[i + 3] = (r >> 24) & 0xFF;
  }

  b[6] = (b[6] & 0x0F) | 0x40; // version 4
  b[8] = (b[8] & 0x3F) | 0x80; // RFC4122 variant

  char out[37];
  snprintf(out, sizeof(out),
           "%02x%02x%02x%02x-%02x%02x-%02x%02x-%02x%02x-%02x%02x%02x%02x%02x%02x",
           b[0], b[1], b[2], b[3],
           b[4], b[5],
           b[6], b[7],
           b[8], b[9],
           b[10], b[11], b[12], b[13], b[14], b[15]);
  return String(out);
}

String getOrCreateScannerId() {
  prefs.begin("device", false);
  String id = prefs.getString("scanner_id", "");
  if (id.length() != 36) {
    id = genUUIDv4();
    prefs.putString("scanner_id", id);
    scannerIdCreatedThisBoot = true;
  }
  prefs.end();
  return id;
}

String uidToString() {
  String s;
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) s += "0";
    s += String(rfid.uid.uidByte[i], HEX);
  }
  s.toUpperCase();
  return s;
}

// -------------------- OLED RENDERING --------------------
void oledRender() {
  if (!oledOk) return;

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextWrap(false);
  display.setTextColor(SSD1306_WHITE, SSD1306_BLACK);

  display.setCursor(0, 0);
  display.print(DEVICE_NAME);
  display.drawFastHLine(0, 10, SCREEN_WIDTH, SSD1306_WHITE);

  display.setCursor(0, 18);
  display.print(oledBackendText);
  display.setCursor(0, 34);
  display.print("UID: ");
  display.print(oledUidText);

  display.display();
}

void oledSetConnecting() {
  oledBackendText = "WiFi: connecting...";
  oledUidText = "--";
  oledRender();
}

void oledSetBackendText(const String& status) {
  oledBackendText = status;
  oledRender();
}

void oledSetUid(const String& uid) {
  oledUidText = uid;
  oledRender();
}

void oledShowScannerId(const String& scannerId, bool createdNow) {
  if (!oledOk) return;

  // UUID is 36 chars; split to fit 128px wide display.
  String top = scannerId.substring(0, 18);
  String bottom = scannerId.substring(18);

  display.clearDisplay();
  display.setTextSize(1);
  display.setTextWrap(false);
  display.setTextColor(SSD1306_WHITE, SSD1306_BLACK);
  display.setCursor(0, 0);
  display.print(createdNow ? "UUID generated:" : "UUID loaded:");
  display.setCursor(0, 18);
  display.print(top);
  display.setCursor(0, 30);
  display.print(bottom);
  display.display();
}

void logScannerIdToSerial() {
  Serial.println("SCANNER_ID (runtime): " + SCANNER_ID);
  Serial.println("BACKEND_HEALTH_URL (runtime): " + BACKEND_HEALTH_URL);
}

// -------------------- WIFI + NTP --------------------
void connectWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  oledSetConnecting();

  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
  }

  Serial.print("WiFi IP: ");
  Serial.println(WiFi.localIP());
  oledSetBackendText("WiFi: connected");
}

void startNtp() { configTzTime(TZ_INFO, NTP1, NTP2); }

void pingBackend() {
  if (WiFi.status() != WL_CONNECTED) {
    oledSetBackendText("API: wifi down");
    startRedFlash(700);
    return;
  }

  HTTPClient http;
  http.setConnectTimeout(1500);
  http.setTimeout(1500);
  http.begin(BACKEND_HEALTH_URL);

  const int code = http.GET();
  if (code == 200) {
    String payload = http.getString();
    oledSetBackendText("API: OK (200)");
    Serial.println("Backend health OK");
    bool targeted = false;
    if (parseBoolLikeFieldFromHealth(payload, "targeted", targeted)) {
      applyTargetedState(targeted);
      Serial.print("targeted=");
      Serial.println(targeted ? "true" : "false");
    } else {
      applyTargetedState(false);
      Serial.println("Backend health response missing targeted");
    }

    bool registered = false;
    if (parseBoolLikeFieldFromHealth(payload, "registered", registered)) {
      applyRegisteredState(registered);
      Serial.print("registered=");
      Serial.println(registered ? "true" : "false");
    } else {
      applyRegisteredState(false);
      Serial.println("Backend health response missing registered");
    }
  } else {
    oledSetBackendText("API: FAIL (" + String(code) + ")");
    startRedFlash(700);
    Serial.println("Backend health failed: " + String(code));
  }

  http.end();
}

void postScanToBackend(const String& uid) {
  if (WiFi.status() != WL_CONNECTED) {
    oledSetBackendText("API: wifi down");
    startRedFlash(700);
    return;
  }

  if (SCANNER_ID.length() < 10) {
    oledSetBackendText("API: set SCANNER_ID");
    Serial.println("Skipping scan post: SCANNER_ID not configured");
    startRedFlash(700);
    return;
  }

  HTTPClient http;
  http.setConnectTimeout(2000);
  http.setTimeout(2000);
  http.begin(BACKEND_SCAN_URL);
  http.addHeader("Content-Type", "application/json");

  String body = "{\"rfidUid\":\"" + uid + "\",\"scannerId\":\"" + SCANNER_ID + "\",\"result\":\"ACCEPTED\"}";
  const int code = http.POST(body);
  String responseBody = http.getString();

  if (code == 200) {
    oledSetBackendText("API: scan posted");
    startBlueFlash(BUZZ_MS);
    Serial.println("Scan posted to backend");
  } else {
    oledSetBackendText("API: post fail " + String(code));
    startRedFlash(700);
    Serial.println("Scan post failed: " + String(code));
    if (responseBody.length() > 0) {
      Serial.println("Response: " + responseBody);
    }
  }

  http.end();
}

// -------------------- SETUP / LOOP --------------------
void setup() {
  Serial.begin(115200);
  delay(1000);

  SCANNER_ID = getOrCreateScannerId();
  BACKEND_HEALTH_URL = String(BACKEND_HEALTH_BASE_URL) + "?scannerId=" + SCANNER_ID;
  if (scannerIdCreatedThisBoot) {
    Serial.println("Generated new SCANNER_ID: " + SCANNER_ID);
  } else {
    Serial.println("Loaded existing SCANNER_ID: " + SCANNER_ID);
  }
  Serial.println("SCANNER_ID (startup): " + SCANNER_ID);
  Serial.println("BACKEND_HEALTH_URL: " + BACKEND_HEALTH_URL);
  lastScannerIdLogMs = millis();

  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, HIGH); // silent

  // RGB init
  pinMode(RGB_R_PIN, OUTPUT);
  pinMode(RGB_G_PIN, OUTPUT);
  pinMode(RGB_B_PIN, OUTPUT);
  rgbWrite(false, false, false); // all off

  // OLED init (I2C remapped to 25/26)
  Wire.begin(I2C_SDA, I2C_SCL);

  oledOk = display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR);
  if (!oledOk) {
    Serial.println("SSD1306 init failed (continuing without OLED)");
  } else {
    // Upside down (rotate 180 degrees) — set ONCE
    display.setRotation(2);
    oledShowScannerId(SCANNER_ID, scannerIdCreatedThisBoot);
    delay(2500);
    oledSetConnecting();
  }

  SPI.begin();
  rfid.PCD_Init();

  connectWiFi();
  logScannerIdToSerial();
  if (oledOk) {
    oledShowScannerId(SCANNER_ID, scannerIdCreatedThisBoot);
    delay(3000);
    oledSetBackendText("WiFi: connected");
  }
  startNtp();
  pingBackend();
  lastBackendHealthMs = millis();

  Serial.println("Scan ready.");
}

void loop() {
  updateBuzzer();
  updateGreenFlash();
  updateRedFlash();
  updateBlueFlash();
  updateYellowFlash();
  updatePurpleRapidFlash();

  if (millis() - lastBackendHealthMs > BACKEND_HEALTH_INTERVAL_MS) {
    pingBackend();
    lastBackendHealthMs = millis();
  }

  if (millis() - lastScannerIdLogMs > 15000) {
    logScannerIdToSerial();
    lastScannerIdLogMs = millis();
  }

  // RFID scan
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  String uid = uidToString();
  uint32_t nowMs = millis();
  if (uid == lastSeenUid && nowMs - lastSeenAt < SCAN_COOLDOWN_MS) return;

  lastSeenUid = uid;
  lastSeenAt = nowMs;

  Serial.println(uid);
  startBeep(BUZZ_MS);

  // Show the latest UID on screen and send it to backend.
  oledSetUid(uid);
  postScanToBackend(uid);

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}
