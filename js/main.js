
document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    document.getElementById("msg1"), // user: Hola!
    document.getElementById("msg2"), // bot: Hola! Soy un chatbot
    document.getElementById("msg3"), // bot typing
    document.getElementById("msg4"), // bot: Cómo puedo ayudarte?
    document.getElementById("msg5"), // user: Quiero información...
  ];

  function showMessage(index, delay) {
    setTimeout(() => {
      // Oculta typing si corresponde
      if (messages[index - 1] && messages[index - 1].id === "msg3") {
        messages[index - 1].classList.add("hidden");
      }

      // Muestra el mensaje actual
      messages[index].classList.remove("hidden");
    }, delay);
  }

  function startChatSequence() {
    // 1️⃣ user Hola
    showMessage(0, 500);
    // 2️⃣ bot Hola
    showMessage(1, 2000);
    // 3️⃣ bot escribiendo...
    showMessage(2, 3000);
    // 4️⃣ bot respuesta
    showMessage(3, 5000);
    // 5️⃣ user respuesta final
    showMessage(4, 7000);
  }

  startChatSequence();
});

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

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    item.classList.toggle("active");
  });
});

