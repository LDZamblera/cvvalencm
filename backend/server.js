const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} = process.env;

function isConfigured() {
  return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

app.post('/send-email', async (req, res) => {
  if (!isConfigured()) {
    return res.status(500).json({ error: 'EmailJS no está configurado en el servidor.' });
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
      const text = await response.text();
      return res.status(response.status).json({ error: text || 'Error de EmailJS' });
    }

    return res.json({ ok: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'No se pudo enviar el mensaje. Intentá de nuevo más tarde.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend ejecutándose en http://localhost:${PORT}`);
});
