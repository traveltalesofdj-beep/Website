export async function handler(event) {
  const { trip, password } = JSON.parse(event.body);

  const passwords = {
    spain: process.env.SPAIN_PASSWORD,
    portugal: process.env.PORTUGAL_PASSWORD
  };

  if (password === passwords[trip]) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ success: false })
  };
}