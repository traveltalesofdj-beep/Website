// Netlify Function for the Airport Pairing Game.
// The fixed assignment data is kept server-side so visitors cannot see the full
// giver -> receiver map by opening browser DevTools on the deployed site.
// Note: this is obfuscation, not security, if your source repository is public.

const TSHIRT_SIZES = {
  Cenvy: "XS",
  Conchita: "UPDATE_SIZE",
  Dillon: "L",
  Jovita: "L",
  Leander: "L",
  Lionel: "UPDATE_SIZE",
  Sonal: "UPDATE_SIZE",
  Zachery: "M"
};

const PAYLOAD_PARTS = [
  "eyJhc3NpZ25tZW50cyI6eyJMZWFuZGVyIjoiWmFjaGVyeSIsIkRpbGxvbiI6IkNvbmNoaXRh",
  "IiwiSm92aXRhIjoiU29uYWwiLCJDZW52eSI6Ikxpb25lbCIsIlNvbmFsIjoiRGlsbG9uIiwi",
  "WmFjaGVyeSI6Ikpvdml0YSIsIkNvbmNoaXRhIjoiTGVhbmRlciIsIkxpb25lbCI6IkNlbnZ5",
  "In19"
];

function getPayload() {
  return JSON.parse(Buffer.from(PAYLOAD_PARTS.join(""), "base64").toString("utf8"));
}

function normalizeName(value) {
  return String(value || "").trim().toLowerCase();
}

function cleanTshirtSize(value) {
  return !value || value === "UPDATE_SIZE" ? "Size not added yet" : value;
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(body)
  };
}

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { success: false, message: "Method not allowed" });
  }

  let requestBody;

  try {
    requestBody = JSON.parse(event.body || "{}");
  } catch (error) {
    return jsonResponse(400, { success: false, message: "Invalid request body" });
  }

  const payload = getPayload();
  const requestedName = normalizeName(requestBody.giver);
  const giverName = Object.keys(payload.assignments).find(
    (name) => normalizeName(name) === requestedName
  );

  if (!giverName) {
    return jsonResponse(404, { success: false, message: "Giver not found" });
  }

  const receiverName = payload.assignments[giverName];

  return jsonResponse(200, {
    success: true,
    giver: {
      name: giverName
    },
    receiver: {
      name: receiverName,
      tshirtSize: cleanTshirtSize(TSHIRT_SIZES[receiverName])
    }
  });
}
