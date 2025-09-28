export default function handler(req, res) {
    const verifyToken = process.env.VERIFY_TOKEN;

    if (req.method === 'GET') {
        const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;

        if (mode === 'subscribe' && token === verifyToken) {
            console.log('WEBHOOK VERIFIED');
            return res.status(200).send(challenge);
        } else {
            return res.status(403).end();
        }
    }

    if (req.method === 'POST') {
        const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
        console.log(`\n\nWebhook received ${timestamp}\n`);
        console.log(JSON.stringify(req.body, null, 2));
        return res.status(200).end();
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}