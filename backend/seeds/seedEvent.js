const BASE_URL = "http://localhost:8080";


async function seedEvent() {
    await fetch(`${BASE_URL}/event/scan`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({rfidUid: "BE:00:28:AF", scannerId: "0907cab8-3f1a-4ddd-92b5-5c6092dc299d"})
    })
}

seedEvent();