
import { setupScrollAnimations } from './animation.js';
import { initCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  setupScrollAnimations();
  // Inicializar carousel si existe
  const carousel = document.querySelector('.servicios-carousel');
  if (carousel) {
    initCarousel();
  }

  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburger-menu');
  const navUl = document.getElementById('main-nav');
  if (hamburger && navUl) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      const isOpen = navUl.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // Opcional: cerrar menú al hacer click en un enlace
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navUl.classList.remove('open');
          hamburger.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });
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
