// parallax.js
class ParallaxEffect {
    constructor(elements) {
        this.parallaxElements = elements
            .map((config) => {
                const element = document.querySelector(config.selector);
                if (!element) {
                    console.warn(`Elemento ${config.selector} no encontrado`);
                    return null;
                }
                return {
                    element,
                    config: {
                        range: config.range || 200,
                        speed: config.speed || 0.3,
                        direction: config.direction || 1,
                        ...config,
                    },
                    startY: 0,
                    observer: null,
                    exitObserver: null,
                    scrollHandler: null,
                };
            })
            .filter(Boolean);

        this.init();
    }

    init() {
        this.parallaxElements.forEach((item) => {
            this.setupElement(item);
        });
    }

    setupElement(item) {
        // Crear el scroll handler para este elemento
        item.scrollHandler = () => {
            const scrolled = window.pageYOffset - item.startY;
            const translateY = Math.min(
                Math.max(
                    scrolled * item.config.speed * item.config.direction,
                    -item.config.range
                ),
                item.config.range
            );

            item.element.style.transform = `translateY(${translateY}px)`;
        };

        // Configurar el Intersection Observer principal
        item.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        item.startY = window.pageYOffset;
                        window.addEventListener("scroll", item.scrollHandler);
                        item.observer.unobserve(item.element);
                        this.setupExitObserver(item);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        // Comenzar a observar
        item.observer.observe(item.element);
    }

    setupExitObserver(item) {
        item.exitObserver = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                window.removeEventListener("scroll", item.scrollHandler);
                item.observer.observe(item.element);
            }
        });
        item.exitObserver.observe(item.element);
    }

    destroy() {
        this.parallaxElements.forEach((item) => {
            if (item.observer) item.observer.disconnect();
            if (item.exitObserver) item.exitObserver.disconnect();
            window.removeEventListener("scroll", item.scrollHandler);
        });
    }
}

// Exportar la clase para usarla como módulo
export default ParallaxEffect;