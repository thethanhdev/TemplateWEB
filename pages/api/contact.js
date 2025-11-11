export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // TODO: Replace with email service (SendGrid/Mailgun) or save to DB.
  console.log('Contact form submitted:', { name, email, message });

  return res.status(200).json({ ok: true, message: 'Đã nhận yêu cầu. Chúng tôi sẽ liên hệ sớm.' });
}
