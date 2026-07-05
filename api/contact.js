export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_key: process.env.MY_ACCESS_KEY,
        subject: "New message from your portfolio",
        from_name: "Dharani N Portfolio",
        name: body.name,
        email: body.email,
        message: body.message
      })
    });

    const data = await response.json();

    console.log("Web3Forms:", data);

    return res.status(response.status).json(data);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
