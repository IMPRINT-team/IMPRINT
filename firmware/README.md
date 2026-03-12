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
A red flash means the device is not connecting to the backend 
A purple flash means the device is targeted by the user
A orange flash means the device is registered by the user
A green flash means the device is connected to the users dashboard


## Parts guide
https://www.amazon.com/dp/B0BXKMGSG6?ref=ppx_yo2ov_dt_b_fed_asin_title / RGB LED
https://www.amazon.com/dp/B0D8BBPV2S?ref=ppx_yo2ov_dt_b_fed_asin_title&th=1 / Buzzer 
https://www.amazon.com/dp/B07VLDSYRW?ref=ppx_yo2ov_dt_b_fed_asin_title / RFID scanner
https://www.amazon.com/ELEGOO-ESP-WROOM-32-Development-Bluetooth-Microcontroller/dp/B0D8T53CQ5/ref=sr_1_4?crid=2JHGEL2HTXHVT&dib=eyJ2IjoiMSJ9.y6g-0itK9757cAALPv8ROjZMLABy3y0V00ME9yq1mYbIBHv3HnuEN8yitRQFUgRy1otAgJ2cz5g56oUcIK6S2OVGb4Y5R5ryA7SRoYv080SxZekkqrNH28oDlkY5wCfrO_nQ-_dXddtOUw3mKtU9viTzJg_Rbwp56UVD-fJh9HSu3C_W4ODpPh6gYw1H2tvAsQxIjfb1D9EYxA_IjI_7F7owN7nhLh5sr0kVf3WMnXtCA-FPn88pkR_dP05AEntOLWMIygTnNSMQ_PzEUkKItHeieF6yUrYu2ejkM7mMItA.Qfr9VGi1y5E7eY16uc0KFMTKIn1T8UuLaYZu1B0JHNg&dib_tag=se&keywords=esp32&qid=1773282843&s=electronics&sprefix=esp32%2Celectronics%2C166&sr=1-4 / ESP32
https://www.amazon.com/dp/B09VKYLYN7?ref=ppx_yo2ov_dt_b_fed_asin_title / board and wires



## Suggested Contents
- Device setup instructions and pin mappings.
- Firmware binaries and flashing guides.
- Status LED behavior and hardware troubleshooting notes.


