#include <MFRC522v2.h>
#include <MFRC522DriverSPI.h>
#include <MFRC522DriverPinSimple.h>
#include <MFRC522Debug.h>

// Learn more about using SPI/I2C or check the pin assigment for your board: https://github.com/OSSLibraries/Arduino_MFRC522v2#pin-layout
MFRC522DriverPinSimple ss_pin(5);

MFRC522DriverSPI driver{ss_pin}; // Create SPI driver
//MFRC522DriverI2C driver{};     // Create I2C driver
MFRC522 mfrc522{driver};         // Create MFRC522 instance

#define BUZZER_PIN 15
// -------------------- ACTIVE BUZZER (NON-BLOCKING, ACTIVE-LOW) --------------------
// Your behavior: it buzzed constantly until scan -> meaning LOW=ON, HIGH=OFF
// const uint32_t BUZZ_MS = 100;

// bool buzzerOn = false;
// uint32_t buzzerOffAt = 0;

// void startBeep(uint32_t durationMs) {
//   digitalWrite(BUZZER_PIN, LOW);      // ON (active-low)
//   buzzerOn = true;
//   buzzerOffAt = millis() + durationMs;
// }

// void updateBuzzer() {
//   if (buzzerOn && (int32_t)(millis() - buzzerOffAt) >= 0) {
//     digitalWrite(BUZZER_PIN, HIGH);   // OFF (active-low)
//     buzzerOn = false;
//   }
// }

void setup() {
  Serial.begin(115200);  // Initialize serial communication
  while (!Serial);       // Do nothing if no serial port is opened (added for Arduinos based on ATMEGA32U4).
  
  // Take control of buzzer ASAP and force SILENT state
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW); // active-low OFF
  
  mfrc522.PCD_Init();    // Init MFRC522 board.
  MFRC522Debug::PCD_DumpVersionToSerial(mfrc522, Serial);	// Show details of PCD - MFRC522 Card Reader details.
	Serial.println(F("Scan PICC to see UID"));
  pinMode(15, OUTPUT);
  pinMode(4, OUTPUT);
}

void loop() {
	// Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
	if (!mfrc522.PICC_IsNewCardPresent()) {
		return;
	}

  //updateBuzzer();


	// Select one of the cards.
	if (!mfrc522.PICC_ReadCardSerial()) {
		return;
	}

  Serial.print("Card UID: ");
  MFRC522Debug::PrintUID(Serial, (mfrc522.uid));
  Serial.println();

  // Save the UID on a String variable
  String uidString = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) {
      uidString += "0"; 
    }
    uidString += String(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.println(uidString);
  if(uidString == "06b479a1"){
    digitalWrite(4, HIGH);
    delay(1000);
    digitalWrite(4, LOW);
    delay(1000);
    digitalWrite(4, HIGH);
    delay(2000);
  }
  else if (uidString == "72f540cb"){
    digitalWrite(15, HIGH);
    digitalWrite(27, HIGH);
    //startBeep(BUZZ_MS);
    delay(4000);
  }
  digitalWrite(27, LOW);
  digitalWrite(15, LOW);
  digitalWrite(4, LOW);
}