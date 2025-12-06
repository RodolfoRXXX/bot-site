

const frases = [
  "Respondé consultas automáticamente",
  "Atendé clientes 24/7 sin esfuerzo",
  "Aumentá tus ventas desde tu sitio",
  "Mostrá información precisa al instante"
];

let i = 0, j = 0, borrando = false;

function typing() {
  const texto = frases[i];
  const display = document.getElementById("typed-text");

  if (!borrando) {
    display.textContent = texto.substring(0, j++);
    if (j > texto.length) {
      borrando = true;
      setTimeout(typing, 1300);
      return;
    }
  } else {
    display.textContent = texto.substring(0, j--);
    if (j < 0) {
      borrando = false;
      i = (i + 1) % frases.length;
    }
  }

  setTimeout(typing, borrando ? 40 : 60);
}

typing();

// Mostrar / ocultar el botón al hacer scroll
window.addEventListener("scroll", () => {
  const scrollBtn = document.getElementById("scrollToTopBtn");
  if (document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Volver arriba con desplazamiento suave
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const form = document.querySelector('.contact-form');
const submitBtn = form.querySelector('.submit-btn');

// Crear contenedor de notificación
const notification = document.createElement('div');
notification.classList.add('form-notification');
document.body.appendChild(notification);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Bloquear botón y mostrar estado de envío
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      showNotification('✅ ¡Gracias por tu mensaje! Te responderé pronto.', 'success');
      form.reset();
    } else {
      showNotification('❌ Hubo un error al enviar el mensaje. Intenta nuevamente.', 'error');
    }
  } catch (error) {
    showNotification('⚠️ Error de conexión. Intenta más tarde.', 'error');
  } finally {
    // Restaurar botón
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// Función para mostrar notificaciones
function showNotification(message, type) {
  notification.textContent = message;
  notification.className = `form-notification ${type}`;
  notification.classList.add('visible');

  setTimeout(() => {
    notification.classList.remove('visible');
  }, 4000);
}

function crearParticulas() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 40; i++) {
    let p = document.createElement("div");
    p.classList.add("particle");

    let size = Math.random() * 6 + 4;
    p.style.width = size + "px";
    p.style.height = size + "px";

    p.style.left = Math.random() * 100 + "%";
    p.style.bottom = "-20px";

    p.style.animationDuration = (Math.random() * 6 + 5) + "s";
    p.style.animationDelay = Math.random() * 3 + "s";

    container.appendChild(p);
  }
}

crearParticulas();

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("menuOverlay");
const links = navLinks.querySelectorAll("a");

function toggleMenu() {
  menuBtn.classList.toggle("active");
  navLinks.classList.toggle("show");
  overlay.classList.toggle("active");
}

menuBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

/* Cierra al hacer click en un link */
links.forEach(link => {
  link.addEventListener("click", toggleMenu);
});

