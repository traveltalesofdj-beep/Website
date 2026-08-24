const crypto = require("node:crypto");
const spainTrip = require("./_data/spain.cjs");
const portugalTrip = require("./_data/portugal.cjs");

const trips = {
  spain: {
    passwordVariable: "SPAIN_PASSWORD",
    data: spainTrip
  },
  portugal: {
    passwordVariable: "PORTUGAL_PASSWORD",
    data: portugalTrip
  }
};

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
  if (typeof submitted !== "string" || typeof expected !== "string" || !expected) {
    return false;
  }

  const submittedBuffer = Buffer.from(submitted, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  return submittedBuffer.length === expectedBuffer.length
    && crypto.timingSafeEqual(submittedBuffer, expectedBuffer);
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

  const expectedPassword = process.env[trip.passwordVariable];

  if (!expectedPassword) {
    console.error(`Missing required environment variable: ${trip.passwordVariable}`);
    return jsonResponse(503, { success: false, message: "Trip access is not configured" });
  }

  if (!passwordsMatch(requestBody.password, expectedPassword)) {
    return jsonResponse(401, { success: false, message: "Invalid trip or password" });
  }

  return jsonResponse(200, {
    success: true,
    trip: trip.data
  });
};
