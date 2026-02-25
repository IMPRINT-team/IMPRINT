const API_BASE_URL = "http://localhost:8080/api";

async function seedEvent() {
  const scannerResponse = await fetch(`${API_BASE_URL}/scanners`);
  const scanners = await scannerResponse.json();
  const scannerId = scanners?.[0]?.deviceId;

  if (!scannerId) {
    throw new Error("No scanners found. Seed scanner records before seeding denied events.");
  }

  await fetch(`${API_BASE_URL}/event/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rfidUid: "BE:00:28:AF", scannerId, result: "DENIED" }),
  });
}

seedEvent();
