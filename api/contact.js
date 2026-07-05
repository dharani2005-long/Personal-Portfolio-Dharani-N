export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: process.env.MY_ACCESS_KEY,
        subject: "New Portfolio Message",
        from_name: "Dharani Portfolio",
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      }),
    });

    const result = await response.json();
    return res.status(response.status).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
