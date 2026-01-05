
export default function handler(req, res) {
    // CORS implementation
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { amount } = req.body;
        // Mock Order Creation for Test Mode
        // In production with real Razorpay, you'd use the SDK
        const order = {
            id: "order_mock_" + Math.random().toString(36).substring(7),
            currency: "INR",
            amount: amount * 100
        };
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
