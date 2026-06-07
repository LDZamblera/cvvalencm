# Portafolio — Valentina Moyano

Sitio estático (HTML/CSS/JS) para el portafolio de Valentina Moyano.

Contenido:
- `index.html` — página principal
- `styles.css` — estilos
- `script.js` — comportamiento y animaciones

Cómo subir a GitHub:

1. Crear un repositorio vacío en GitHub (sitio web o con `gh repo create`).

2. En la carpeta del proyecto ejecutar:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
# Reemplazá <URL-REMOTE> con la URL del repo que creaste en GitHub
git remote add origin <URL-REMOTE>
git push -u origin main
```

Recomendaciones de seguridad:
- No subir `.env` ni claves al repo.
- Usar backend para secretos (ej.: EmailJS), ver `server.js` ejemplo en la documentación.

