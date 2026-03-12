<!-- Suggested use: Capture notes about RFID firmware, hardware specs, and integration points. -->
# Firmware

## Overview
This directory is reserved for firmware references, hardware configuration notes, and embedded build artifacts to support the RFID devices.

## Pin Layout
### Led
- Red Pin to Pin 14
- Green Pin to Pin 12
- Blue Pin to Pin 13
- GND to Ground
### Buzzer
- I/O to Pin 27
- VCC to 3 volt output
- GND to Ground
### RFID Scanner
- SS to Pin 5
- GND to Ground
- RST Pin to Pin 22
- 3.3V to 3 Volt Power

## Need to Edit in Code
Under the "DEVICE + WIFI" section starting at line 31 You need to update "const char* WIFI_SSID   = "REPLACE_ME";" with your wifi name and "const char* WIFI_PASS   = "REPLACE_ME";" with your wifi password. You may also edit "const char* DEVICE_NAME = "YOURNAMEHERE";" with the desired device name.
Under the "BACKEND" section you need to update "const char* BACKEND_HEALTH_BASE_URL = "http://YOURIP:8080/health";" and "const char* BACKEND_SCAN_URL   = "http://YOURIP:8080/api/event/scan";"


## Light Guide



## Suggested Contents
- Device setup instructions and pin mappings.
- Firmware binaries and flashing guides.
- Status LED behavior and hardware troubleshooting notes.


