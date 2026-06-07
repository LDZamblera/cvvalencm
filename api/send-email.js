export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } = process.env;
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    return res.status(500).json({ error: 'EmailJS no está configurado en este entorno.' });
  }

  const { nombre, email, telefono, mensaje } = req.body || {};
  if (!nombre || !email || !telefono || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          nombre,
          email,
          telefono,
          mensaje,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText || 'Error al enviar el mensaje.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'No se pudo enviar el mensaje. Intentá de nuevo más tarde.' });
  }
}
