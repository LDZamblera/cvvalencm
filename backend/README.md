# Backend para CV Valen CM

Este backend recibe el formulario de contacto y reenvía el email usando EmailJS.
Así las claves quedan en el servidor y no en el navegador.

## Archivos clave

- `server.js` — servidor Express que expone `POST /send-email`
- `.env.example` — variables de entorno que debe usar el servidor
- `package.json` — dependencias y script de arranque

## Instalación local

```bash
cd backend
npm install
cp .env.example .env
```

Luego completá `.env` con las claves reales de EmailJS:

```env
EMAILJS_SERVICE_ID=service_xxx
EMAILJS_TEMPLATE_ID=template_xxx
EMAILJS_PUBLIC_KEY=tu_public_key
```

Iniciá el servidor:

```bash
npm start
```

## Uso

El endpoint quedará disponible en:

```
POST http://localhost:3000/send-email
```

El frontend actual ya está preparado para enviar el formulario a `/api/send-email`.

## Despliegue en Vercel

Si querés desplegar este backend en Vercel, podés usar el directorio `backend` como proyecto separado.
En el dashboard de Vercel configurá las variables de entorno con los mismos nombres:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

Si lo desplegás en otra URL, cambiá `BACKEND_URL` en `script.js` por la URL de tu backend.
