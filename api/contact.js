export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    const response = await fetch(
        "https://api.web3forms.com/submit",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_key: process.env.MY_ACCESS_KEY,
                ...req.body
            })
        }
    );

    const data = await response.json();

    res.status(200).json(data);
}
