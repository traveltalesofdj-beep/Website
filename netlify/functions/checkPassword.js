const spainTrip = require("./_data/spain.cjs");

const trips = {
  spain: {
    data: spainTrip
  }
};

const TRIP_PASSWORD = "Valencia2026";

function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders
    },
    body: JSON.stringify(body)
  };
}

function passwordsMatch(submitted, expected) {
  return typeof submitted === "string" && submitted === expected;
}

exports.handler = async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { success: false, message: "Method not allowed" }, { Allow: "POST" });
  }

  let requestBody;

  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body;
    requestBody = JSON.parse(rawBody || "{}");
  } catch (error) {
    return jsonResponse(400, { success: false, message: "Invalid request body" });
  }

  const tripKey = typeof requestBody.trip === "string"
    ? requestBody.trip.trim().toLowerCase()
    : "";
  const trip = trips[tripKey];

  if (!trip || typeof requestBody.password !== "string" || !requestBody.password) {
    return jsonResponse(401, { success: false, message: "Invalid trip or password" });
  }

  if (!passwordsMatch(requestBody.password, TRIP_PASSWORD)) {
    return jsonResponse(401, { success: false, message: "Invalid trip or password" });
  }

  return jsonResponse(200, {
    success: true,
    trip: trip.data
  });
};
