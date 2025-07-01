(function () {
  const countdownEl = document.getElementById("countdown");
  const countdownKey = "ofertaCountdown";

  // Duración inicial para pruebas: 3 minutos
  const initialDuration = (3 * 24 * 60 + 2 * 60 + 30) * 60 * 1000;

  // Si no existe fecha de expiración en localStorage, créala
  if (!localStorage.getItem(countdownKey)) {
    const expiresAt = Date.now() + initialDuration;
    localStorage.setItem(countdownKey, expiresAt);
  }

  function updateCountdown() {
    const expiresAt = parseInt(localStorage.getItem(countdownKey), 10);
    const now = Date.now();
    let remaining = expiresAt - now;

    // Si ya expiró, reseteamos el contador
    if (remaining <= 0) {
      const newExpiresAt = Date.now() + initialDuration;
      localStorage.setItem(countdownKey, newExpiresAt);
      remaining = newExpiresAt - now;
    }

    // Calculamos días, horas, minutos, segundos
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    // Armamos el texto
    countdownEl.textContent = `Oferta especial expira en ${days} día${days !== 1 ? "s" : ""}, ${hours} hora${hours !== 1 ? "s" : ""}, ${minutes} minuto${minutes !== 1 ? "s" : ""} y ${seconds} segundo${seconds !== 1 ? "s" : ""} ⏳`;

    // Urgencia visual: cuando falten menos de 12 horas
    if (remaining <= 12 * 60 * 60 * 1000) {
      countdownEl.style.color = "red";
      countdownEl.style.fontWeight = "bold";
      countdownEl.style.backgroundColor = "white";
      countdownEl.style.padding = "6px 12px";
      countdownEl.style.borderRadius = "8px";
      countdownEl.style.display = "inline-block";
      countdownEl.style.animation = "pulse 4s infinite";
    } else {
      // Restaurar estilo si se resetea
      countdownEl.style.color = "";
      countdownEl.style.fontWeight = "";
      countdownEl.style.backgroundColor = "";
      countdownEl.style.padding = "";
      countdownEl.style.borderRadius = "";
      countdownEl.style.display = "";
      countdownEl.style.animation = "";
    }

    // Repetimos cada segundo
    setTimeout(updateCountdown, 1000);
  }

  // Definir animación CSS vía JS
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  updateCountdown();
})();
