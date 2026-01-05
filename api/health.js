
export default function handler(req, res) {
    res.status(200).json({ status: 'active', message: 'Vercel Serverless Function Online' });
}
