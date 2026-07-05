// export default async function handler(req, res) {

//     if (req.method !== "POST") {
//         return res.status(405).json({
//             success: false,
//             message: "Method Not Allowed"
//         });
//     }

//     try {

//         const response = await fetch(
//             "https://api.web3forms.com/submit",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     access_key: process.env.MY_ACCESS_KEY,
//                     subject: "New message from your portfolio",
//                     from_name: "Dharani N Portfolio",
//                     ...req.body
//                 })
//             }
//         );

//         const data = await response.json();

//         return res.status(200).json(data);

//     } catch (error) {

//         return res.status(500).json({
//             success: false,
//             message: "Internal Server Error"
//         });

//     }
// }
//-----------------------------



export default async function handler(req, res) {
    try {
        console.log("Access Key:", process.env.MY_ACCESS_KEY);

        return res.status(200).json({
            success: true,
            keyExists: !!process.env.MY_ACCESS_KEY
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
