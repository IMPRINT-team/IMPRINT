const BASE_URL = "http://localhost:8080";


async function seedEvent() {
    const scanner = await fetch(`${BASE_URL}/`)
    const scannerObj = await scanner.json()
    const scannerId = scannerObj[0].deviceId
    await fetch(`${BASE_URL}/event/scan`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({rfidUid: "BE:00:28:AF", scannerId: `${scannerId}`, result: "DENIED"})
    })
}

seedEvent();