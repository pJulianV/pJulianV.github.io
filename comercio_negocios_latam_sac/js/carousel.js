// carousel.js
export function initCarousel() {
  const carousel = document.querySelector('.servicios-carousel');
  const cards = document.querySelectorAll('.servicio-card');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentIndex = 0;
  const totalCards = cards.length;
  const cardsToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
  const maxIndex = Math.ceil(totalCards - cardsToShow);

  // Create dots
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.carousel-dot');

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem
    const offset = -(currentIndex * (cardWidth + gap));
    carousel.style.transform = `translateX(${offset}px)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  // Auto-play
  let autoplayInterval = setInterval(() => {
    if (currentIndex >= maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarousel();
  }, 5000);

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }, 5000);
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > 50) {
      goToSlide(currentIndex - 1);
    }
  });

  // Update on resize
  window.addEventListener('resize', () => {
    const newCardsToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const newMaxIndex = Math.ceil(totalCards - newCardsToShow);
    if (currentIndex > newMaxIndex) {
      currentIndex = newMaxIndex;
    }
    updateCarousel();
  });
}
