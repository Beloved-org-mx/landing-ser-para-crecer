const navbar = document.querySelector("#navbar");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navbar.classList.add("navbar-scroll-over-dark");
      } else {
        navbar.classList.remove("navbar-scroll-over-dark");
      }
    });
  },
  {
    threshold: 0.1,
  },
);

// Selecciona todas las secciones .bg-dark a observar
document.querySelectorAll(".bg-dark").forEach((section) => {
  observer.observe(section);
});
