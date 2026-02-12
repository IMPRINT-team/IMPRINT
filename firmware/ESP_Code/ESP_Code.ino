#include <WiFi.h>
#include <WebServer.h>
#include <SPI.h>
#include <time.h>
#include <MFRC522.h>
// #include <MFRC522DriverSPI.h>
// #include <MFRC522DriverPinSimple.h>
// #include <MFRC522Debug.h>

// -------------------- WIFI CONFIG --------------------
// const char* WIFI_SSID = "Wesley Foundation Wi-Fi";
// const char* WIFI_PASS = "warmed<3";
const char* WIFI_SSID = "EagleNet";
const char* WIFI_PASS = "JJ68iDDg";

// -------------------- NTP CONFIG --------------------
// America/Chicago time zone (CST/CDT with DST rules)
const char* TZ_INFO = "CST6CDT,M3.2.0/2,M11.1.0/2";
const char* NTP1 = "pool.ntp.org";
const char* NTP2 = "time.nist.gov";

// -------------------- PINS --------------------
#define SS_PIN     5
#define RST_PIN    22
#define BUZZER_PIN 27
#define greenLED_PIN 15
#define redLED_PIN 4

// -------------------- RFID --------------------
MFRC522 rfid(SS_PIN, RST_PIN);


// -------------------- ACTIVE BUZZER (NON-BLOCKING, ACTIVE-LOW) --------------------
// Your behavior: it buzzed constantly until scan -> meaning LOW=ON, HIGH=OFF
const uint32_t BUZZ_MS = 100;
bool buzzerOn = false;
uint32_t buzzerOffAt = 0;

void startBeep(uint32_t durationMs) {
  digitalWrite(BUZZER_PIN, LOW);      // ON (active-low)
  buzzerOn = true;
  buzzerOffAt = millis() + durationMs;
}

void updateBuzzer() {
  if (buzzerOn && (int32_t)(millis() - buzzerOffAt) >= 0) {
    digitalWrite(BUZZER_PIN, HIGH);   // OFF (active-low)
    buzzerOn = false;
  }
}

// -------------------- RFID ANTI-REPEAT --------------------
String lastSeenUid = "";
uint32_t lastSeenAt = 0;
const uint32_t SCAN_COOLDOWN_MS = 1500;

// -------------------- SCAN HISTORY (RING BUFFER) --------------------
static const int HISTORY_MAX = 20;

struct ScanEvent {
  String uid;
  time_t epoch;  // real unix time (seconds)
};

ScanEvent history[HISTORY_MAX];
int historyCount = 0;   // how many valid items
int historyHead = 0;    // next insert index (ring)

void addScanToHistory(const String& uid, time_t epoch) {
  history[historyHead] = { uid, epoch };
  historyHead = (historyHead + 1) % HISTORY_MAX;
  if (historyCount < HISTORY_MAX) historyCount++;
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

// -------------------- TIME HELPERS --------------------
bool getTimeNow(time_t &outEpoch) {
  time_t now = time(nullptr);
  // If NTP isn't synced yet, time() returns a small value near 0/1970
  if (now < 1700000000) return false;
  outEpoch = now;
  return true;
}

String isoTimeLocal(time_t epoch) {
  struct tm t;
  localtime_r(&epoch, &t);
  char buf[32];
  // e.g., 2026-02-01 20:15:03
  strftime(buf, sizeof(buf), "%Y-%m-%d %H:%M:%S", &t);
  return String(buf);
}

// -------------------- WEB SERVER --------------------
WebServer server(80);

// -------------------- WEB UI --------------------
const char INDEX_HTML[] PROGMEM = R"HTML(
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>ESP32 RFID Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; }
    .wrap { max-width: 820px; }
    .card { padding: 16px; border: 1px solid #ddd; border-radius: 12px; margin-bottom: 16px; }
    h2 { margin-top: 0; }
    .status { color:#444; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #eee; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    th { font-family: Arial, sans-serif; }
    .uid { font-weight: 700; }
    .muted { color: #666; }
    .pill { display:inline-block; padding: 3px 8px; border-radius: 999px; background:#f4f4f4; font-size: 12px; margin-left: 8px;}
  </style>
</head>
<body>
  <div class="wrap">
    <h2>ESP32 RFID Live View</h2>

    <div class="card">
      <div class="status" id="status">Connecting...</div>
      <div class="muted">This page refreshes automatically.</div>
    </div>

    <div class="card">
      <div style="display:flex; align-items:center; justify-content:space-between;">
        <div><strong>Last 20 scans</strong> <span class="pill" id="count">0</span></div>
        <div class="muted">Endpoint: <code>/scans</code></div>
      </div>
      <div style="overflow:auto; margin-top:10px;">
        <table>
          <thead>
            <tr><th>Time (local)</th><th>UID</th></tr>
          </thead>
          <tbody id="rows">
            <tr><td class="muted" colspan="2">Waiting for scans...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

<script>
async function refresh() {
  try {
    const r = await fetch('/scans', { cache: 'no-store' });
    const j = await r.json();

    document.getElementById('count').textContent = j.count ?? 0;

    // Status line
    const ntp = j.ntp_synced ? "NTP synced" : "NTP not synced yet";
    document.getElementById('status').textContent =
      "Online — " + ntp + (j.device_time_local ? (" — Device time: " + j.device_time_local) : "");

    const rows = document.getElementById('rows');
    rows.innerHTML = "";

    if (!j.scans || j.scans.length === 0) {
      rows.innerHTML = '<tr><td class="muted" colspan="2">Waiting for scans...</td></tr>';
      return;
    }

    for (const s of j.scans) {
      const tr = document.createElement('tr');

      const tdTime = document.createElement('td');
      tdTime.textContent = s.time_local || "(time unavailable)";
      tr.appendChild(tdTime);

      const tdUid = document.createElement('td');
      tdUid.innerHTML = '<span class="uid">' + (s.uid || "") + '</span>';
      tr.appendChild(tdUid);

      rows.appendChild(tr);
    }
  } catch (e) {
    document.getElementById('status').textContent = "Disconnected — refresh the page";
  }
}

setInterval(refresh, 500); // 2x/sec feels live
refresh();
</script>
</body>
</html>
)HTML";

// -------------------- WEB HANDLERS --------------------
void handleRoot() {
  server.send(200, "text/html", INDEX_HTML);
}

String jsonEscape(const String& s) {
  String out;
  out.reserve(s.length() + 8);
  for (size_t i = 0; i < s.length(); i++) {
    char c = s[i];
    if (c == '\\' || c == '"') { out += '\\'; out += c; }
    else if (c == '\n') out += "\\n";
    else if (c == '\r') out += "\\r";
    else out += c;
  }
  return out;
}

// Returns scans in newest->oldest order
void handleScans() {
  // Device "now" line
  time_t nowEpoch;
  bool ntpSynced = getTimeNow(nowEpoch);
  String nowLocal = ntpSynced ? isoTimeLocal(nowEpoch) : String("");

  String json = "{";
  json += "\"count\":" + String(historyCount) + ",";
  json += "\"ntp_synced\":" + String(ntpSynced ? "true" : "false") + ",";
  json += "\"device_time_local\":\"" + jsonEscape(nowLocal) + "\",";
  json += "\"scans\":[";

  // Walk ring buffer newest->oldest:
  // newest item is at (historyHead - 1)
  for (int i = 0; i < historyCount; i++) {
    int idx = (historyHead - 1 - i);
    while (idx < 0) idx += HISTORY_MAX;
    idx %= HISTORY_MAX;

    const ScanEvent& e = history[idx];

    String tLocal = (e.epoch > 0) ? isoTimeLocal(e.epoch) : String("");
    json += "{";
    json += "\"uid\":\"" + jsonEscape(e.uid) + "\",";
    json += "\"epoch\":" + String((unsigned long)e.epoch) + ",";
    json += "\"time_local\":\"" + jsonEscape(tLocal) + "\"";
    json += "}";

    if (i != historyCount - 1) json += ",";
  }

  json += "]}";
  server.send(200, "application/json", json);
}

// -------------------- WIFI + NTP --------------------
void connectWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  Serial.print("Connecting to WiFi");
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(300);
    Serial.print(".");
  }
  Serial.println();

  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("WiFi connected! IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("WiFi NOT connected. Check SSID/PASS.");
  }
}

void startNtp() {
  // Set timezone rules then start NTP
  setenv("TZ", TZ_INFO, 1);
  tzset();
  configTime(0, 0, NTP1, NTP2);
  configTzTime(TZ_INFO,NTP1,NTP2);
  Serial.println("Starting NTP sync...");
}

// -------------------- SETUP/LOOP --------------------
void setup() {
  Serial.begin(115200);
  delay(2000);

  // Set up LED pins
  pinMode(greenLED_PIN, OUTPUT);
  pinMode(redLED_PIN, OUTPUT);

  // Take control of buzzer ASAP and force SILENT state
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, HIGH); // active-low OFF

  // RFID init
  SPI.begin();
  rfid.PCD_Init();
  //MFRC522Debug::PCD_DumpVersionToSerial(MFRC522, Serial);

  // WiFi + NTP
  connectWiFi();
  startNtp();

  // Web endpoints
  server.on("/", handleRoot);
  server.on("/scans", handleScans);
  server.begin();

  Serial.println("Open browser to: http://<ESP32_IP>/");
  Serial.println("RC522 ready. Scan a tag...");
}

void loop() {
  updateBuzzer();
  server.handleClient();
  // if (!MFRC522.PICC_IsNewCardPresent()) {
	// 	return;
	// }

  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  String uid = uidToString();
  uint32_t nowMs = millis();

  // Prevent repeated beeps while holding same card
  if (uid == lastSeenUid && (nowMs - lastSeenAt) < SCAN_COOLDOWN_MS) {
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
    return;
  }
  lastSeenUid = uid;
  lastSeenAt = nowMs;

  Serial.print("UID: ");
  Serial.println(uid);

  // Record time (real time if NTP synced; else store 0)
  time_t epoch;
  if (!getTimeNow(epoch)) epoch = 0;
  addScanToHistory(uid, epoch);

  // Beepand flash red 
  if(uid == "06B479A1"){
    digitalWrite(redLED_PIN, HIGH);
    startBeep(BUZZ_MS);
    delay(1000);
    updateBuzzer();
    digitalWrite(redLED_PIN, LOW);
    delay(1000);
    digitalWrite(redLED_PIN, HIGH);
    startBeep(BUZZ_MS);
    delay(2000);
  }
  //beep once long and turn on green light
  else if (uid == "72F540CB"){
    digitalWrite(greenLED_PIN, HIGH);
    startBeep(BUZZ_MS);
    delay(4000);
  }
  digitalWrite(redLED_PIN, LOW);
  digitalWrite(greenLED_PIN, LOW);
  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}
