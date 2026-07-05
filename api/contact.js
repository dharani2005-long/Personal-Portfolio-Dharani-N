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
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                access_key: process.env.MY_ACCESS_KEY,
                name: body.name,
                email: body.email,
                message: body.message,
                subject: "Portfolio Contact",
                from_name: "Dharani Portfolio"
            })
        });

        const data = await response.json();

        return res.status(response.status).json(data);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
}
