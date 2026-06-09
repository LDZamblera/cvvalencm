/**
 * =====================================================
 * VALENTINA TORRES — Community Manager Portfolio
 * script.js
 * Funcionalidades:
 *  - Navbar sticky con cambio de estilo
 *  - Menú hamburguesa responsive
 *  - Efecto de texto animado (typing) en el Hero
 *  - Partículas canvas en el fondo global
 *  - Scroll suave + reveal de secciones
 *  - Validación y envío del formulario de contacto
 *  - Botón "volver arriba"
 * =====================================================
 */

/* ========================
   1. NAVBAR STICKY
======================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ========================
   2. MENÚ HAMBURGUESA
======================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  // Evita scroll del body mientras el menú está abierto
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ========================
   3. TYPING EFFECT (HERO)
   ✏️ EDITAR: los roles que quieras mostrar
======================== */
const roles = [
  'Community Manager',
  'Creadora de Contenido',
  'Productora Audiovisual',
  'Gestora de Instagram & TikTok',
];

const typedEl  = document.getElementById('typedText');
let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
let typingTimeout;

function typeRole() {
  const currentRole = roles[roleIndex];
  const speed = isDeleting ? 50 : 90;

  if (!isDeleting) {
    typedEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      // Pausa al terminar de escribir
      typingTimeout = setTimeout(() => { isDeleting = true; typeRole(); }, 2000);
      return;
    }
  } else {
    typedEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  typingTimeout = setTimeout(typeRole, speed);
}

// Inicia el typing con un pequeño delay
setTimeout(typeRole, 500);

const birthDate = new Date('2004-09-24');

function calculateAge(dateOfBirth) {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  const dayDiff = today.getDate() - dateOfBirth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

function updateAgeValues() {
  const age = calculateAge(birthDate);
  const ageText = document.getElementById('ageText');
  const ageStat = document.querySelector('#ageStat .stat-num');

  if (ageText) ageText.textContent = age;
  if (ageStat) ageStat.textContent = age;
}

updateAgeValues();

function initHeroReactions() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'hero-reactions';
  hero.appendChild(wrapper);

  const icons = ['heart', 'heart', 'heart', 'heart', 'heart', 'like', 'like', 'like', 'like', 'like'];

  function createReaction(type, delay = 0) {
    const reaction = document.createElement('div');
    reaction.className = `hero-reaction hero-reaction--${type}`;
    reaction.innerHTML = type === 'heart'
      ? `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
      : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 3 7.59 9.59C7.22 9.95 7 10.45 7 11v8c0 1.1.9 2 2 2h7c.83 0 1.54-.5 1.84-1.22L22 12.82c.09-.23.14-.47.14-.72V11c0-1.1-.9-2-2-2zM1 10h4v12H1z"/></svg>`;

    const startLeft = Math.random() * 28 + 56; // fuera del texto del lado derecho
    reaction.style.left = `${startLeft}%`;
    reaction.style.top = `${Math.random() * 24 + 20}%`;
    reaction.style.setProperty('--x-offset', `${Math.random() * 120 - 60}px`);
    reaction.style.setProperty('--y-offset', `${Math.random() * 10 - 2}vh`);
    reaction.style.animationDelay = `${delay}s`;
    reaction.style.animationDuration = `${3.1 + Math.random() * 1.3}s`;
    wrapper.appendChild(reaction);
    reaction.addEventListener('animationend', () => reaction.remove());
  }

  icons.forEach((type, index) => {
    createReaction(type, index * 0.45);
  });
}

window.addEventListener('load', initHeroReactions);

/* ========================
   4. PARTÍCULAS CANVAS (FONDO GLOBAL)
======================== */
(function initParticles() {
  const canvas = document.getElementById('pageParticleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const parent = canvas.parentElement;

  let particles = [];
  let W, H;

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x    = Math.random() * W;
      this.y    = Math.random() * H;
      this.size = Math.random() * 3.8 + 1.2;
      this.vx   = (Math.random() - 0.5) * 0.55;
      this.vy   = (Math.random() - 0.5) * 0.55;
      // Color más vivo entre violeta y fucsia con brillo adicional
      this.hue  = 250 + Math.random() * 90;
      this.alpha = Math.random() * 0.28 + 0.22;
      this.glow = Math.random() * 4 + 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Rebote suave en los bordes
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      const color = `hsla(${this.hue}, 95%, 70%, ${this.alpha})`;
      ctx.fillStyle = color;
      ctx.shadowBlur = this.glow;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function resize() {
    const prevCount = particles.length;
    W = canvas.width  = parent.offsetWidth;
    H = canvas.height = parent.offsetHeight;
    const nextCount = Math.min(Math.floor((W * H) / 4200), 240);
    if (!particles.length || nextCount !== prevCount) {
      particles = Array.from({ length: nextCount }, () => new Particle());
    } else {
      particles.forEach(p => {
        p.x = Math.min(p.x, W);
        p.y = Math.min(p.y, H);
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);

  // Dibuja líneas entre partículas cercanas
  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  // Loop de animación
  function animate() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ========================
   5. REVEAL AL HACER SCROLL
   (Intersection Observer)
======================== */
(function initReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeño stagger entre elementos del mismo grupo
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
})();

/* ========================
   6. VALIDACIÓN DEL FORMULARIO + BACKEND
   Esta versión envía al backend y no expone las claves en el frontend.
======================== */
const BACKEND_URL = ''; // Dejar vacío para usar el mismo dominio.
const EMAIL_ENDPOINT = '/api/send-email';
const MAX_MESSAGE_LENGTH = 250;

const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitForm();
    }
  });
}

function validateForm() {
  const nombre   = document.getElementById('nombre');
  const email    = document.getElementById('email');
  const telefono = document.getElementById('telefono');
  const mensaje  = document.getElementById('mensaje');
  const errors   = [];

  clearErrors();

  if (!nombre.value.trim() || nombre.value.trim().length < 2) {
    showError(nombre, 'errorNombre', 'Ingresá tu nombre (mínimo 2 caracteres).');
    errors.push('Ingresá tu nombre (mínimo 2 caracteres).');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
    showError(email, 'errorEmail', 'Ingresá un email válido.');
    errors.push('Ingresá un email válido.');
  }

  const telefonoDigits = telefono.value.replace(/\D/g, '');
  if (!telefono.value.trim() || telefonoDigits.length < 8) {
    showError(telefono, 'errorTelefono', 'Ingresá un celular o teléfono válido (mínimo 8 dígitos).');
    errors.push('Ingresá un celular o teléfono válido (mínimo 8 dígitos).');
  }

  if (!mensaje.value.trim() || mensaje.value.trim().length < 10) {
    showError(mensaje, 'errorMensaje', 'El mensaje debe tener al menos 10 caracteres.');
    errors.push('El mensaje debe tener al menos 10 caracteres.');
  }

  if (errors.length > 0) {
    showFormErrorAlert(errors);
    return false;
  }

  return true;
}

function showFormErrorAlert(messages) {
  if (typeof Swal === 'undefined') return;

  const list = messages.map(msg => `<li>${msg}</li>`).join('');

  Swal.fire({
    icon: 'error',
    title: 'Revisá el formulario',
    html: `<ul class="swal-error-list">${list}</ul>`,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#7c3aed',
    background: '#13131f',
    color: '#f8f8ff',
    iconColor: '#f87171',
  });
}

function showError(input, errorId, message) {
  input.classList.add('error');
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.textContent = message;
}

function clearErrors() {
  ['nombre', 'email', 'telefono', 'mensaje'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('error');
  });
  ['errorNombre', 'errorEmail', 'errorTelefono', 'errorMensaje'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
}

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
}

async function submitForm() {
  const btn = contactForm.querySelector('button[type="submit"]');

  btn.textContent = 'Enviando...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const mensajeRaw = document.getElementById('mensaje').value.trim();
  const mensaje = truncateText(mensajeRaw, MAX_MESSAGE_LENGTH);

  const payload = {
    nombre,
    email,
    telefono,
    mensaje,
  };

  try {
    const response = await fetch((BACKEND_URL || '') + EMAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = 'Error al enviar el mensaje';
      try {
        const errorData = JSON.parse(text || '{}');
        errorMessage = errorData.error || errorMessage;
      } catch {
        if (text) errorMessage = text;
      }
      throw new Error(errorMessage);
    }

    contactForm.reset();
    formSuccess.classList.add('show');

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por escribirme. Te respondo pronto.',
        confirmButtonText: 'Genial',
        confirmButtonColor: '#7c3aed',
        background: '#13131f',
        color: '#f8f8ff',
      });
    }

    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  } catch (err) {
    console.error('Error en formulario de contacto:', err);
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'error',
        title: 'No se pudo enviar',
        text: 'Intentá de nuevo en unos minutos o escribime por WhatsApp.',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#7c3aed',
        background: '#13131f',
        color: '#f8f8ff',
      });
    }
  } finally {
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
    btn.style.opacity = '';
  }
}

/* ========================
   7. BOTÓN VOLVER ARRIBA
======================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ========================
   8. SCROLL SUAVE PARA TODOS
   LOS ENLACES INTERNOS
======================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = navbar ? navbar.offsetHeight : 70;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ========================
   9. ANIMACIÓN DE NÚMEROS
   (stats en Sobre mí)
======================== */
function animateNumber(el, target, duration = 1600) {
  const isDecimal = target % 1 !== 0;
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Easing out
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

// Observa los números para animarlos cuando entran en vista
const statNums = document.querySelectorAll('.stat-num');
const numObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el   = entry.target;
      const text = el.textContent.trim();
      // Extrae el número y el sufijo
      const match = text.match(/^([+×]?)(\d+)([\+\*]?)(.*)$/);
      if (match) {
        const prefix = match[1];
        const num    = parseInt(match[2]);
        const suffix = match[3] + match[4];
        el.dataset.suffix = suffix;
        // Agrega prefijo como pseudo-elemento via textContent dinámico
        let count = 0;
        const duration = 1400;
        const start = performance.now();
        const animate = (now) => {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          count = Math.floor(eased * num);
          el.textContent = prefix + count + suffix;
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = text; // restaura el texto original
        };
        requestAnimationFrame(animate);
      }
      numObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => numObserver.observe(el));

/* ========================
   10. EFECTO HOVER EN CARDS
   (Tilt suave al mover el mouse)
======================== */
function initCardTilt() {
  const cards = document.querySelectorAll('.proyecto-card, .servicio-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      const tiltX  = y * 8;  // grados
      const tiltY  = -x * 8;
      card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

// Solo en dispositivos con puntero fino (no táctil)
if (window.matchMedia('(pointer: fine)').matches) {
  initCardTilt();
}

/* ========================
   11. CARRUSEL HABILIDADES
======================== */
function initSkillsCarousel() {
  const carousel = document.getElementById('skillsCarousel');
  if (!carousel) return;

  const track       = carousel.querySelector('.skills-carousel-track');
  const cards       = track.querySelectorAll('.skill-card');
  const prevBtn     = carousel.querySelector('.carousel-prev');
  const nextBtn     = carousel.querySelector('.carousel-next');
  const dotsWrap    = document.getElementById('skillsDots');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentIndex  = 0;
  let slidesPerView = 1;
  let autoplayTimer = null;
  let isPaused      = false;
  let touchStartX   = 0;

  function getSlidesPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - slidesPerView);
  }

  function getGap() {
    return parseFloat(getComputedStyle(track).gap) || 20;
  }

  function updatePosition() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const offset    = currentIndex * (cardWidth + getGap());
    track.style.transform = `translateX(-${offset}px)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });
  }

  function renderDots() {
    dotsWrap.innerHTML = '';
    const total = getMaxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', `Ir a habilidad ${i + 1}`);
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
    updatePosition();
    resetAutoplay();
  }

  function next() {
    goTo(currentIndex >= getMaxIndex() ? 0 : currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex <= 0 ? getMaxIndex() : currentIndex - 1);
  }

  function refresh() {
    slidesPerView = getSlidesPerView();
    carousel.style.setProperty('--slides-per-view', slidesPerView);
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    renderDots();
    updatePosition();
  }

  function startAutoplay() {
    if (reducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isPaused) next();
    }, 4500);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  carousel.addEventListener('mouseenter', () => { isPaused = true; });
  carousel.addEventListener('mouseleave', () => { isPaused = false; });

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) diff > 0 ? next() : prev();
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refresh, 150);
  });

  refresh();
  startAutoplay();
}

initSkillsCarousel();
