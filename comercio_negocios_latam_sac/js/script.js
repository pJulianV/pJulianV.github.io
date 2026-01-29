
import { setupScrollAnimations } from './animation.js';
import { initCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  // Inicializar carousel si existe
  const carousel = document.querySelector('.servicios-carousel');
  if (carousel) {
    initCarousel();
  }
});

// Smooth scroll para navegación
// Solo aplicar smooth scroll si el href apunta a un id existente en la página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
