/**
 * Utilidades para optimización de imágenes y lazy loading
 */

/**
 * Implementar lazy loading para imágenes sin atributo loading="lazy"
 */
export const initLazyLoading = () => {
  // Solo si el navegador no soporta lazy loading nativo
  if ('loading' in HTMLImageElement.prototype) {
    return; // El navegador ya lo soporta nativamente
  }

  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px' // Cargar imagen 50px antes de que entre en viewport
  });

  images.forEach(img => imageObserver.observe(img));
};

/**
 * Precargar imágenes críticas
 */
export const preloadCriticalImages = (imageUrls) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Detectar soporte de WebP
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

/**
 * Optimizar imagen antes de cargar (reducir calidad si es necesario)
 */
export const optimizeImage = (imgElement, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, 'image/jpeg', quality);
    };
    
    img.onerror = reject;
    img.src = imgElement.src;
  });
};

/**
 * Obtener dimensiones óptimas de imagen según viewport
 */
export const getOptimalImageSize = () => {
  const width = window.innerWidth;
  
  if (width <= 480) return 'small';
  if (width <= 768) return 'medium';
  if (width <= 1200) return 'large';
  return 'xlarge';
};

/**
 * Cargar imagen progresivamente (placeholder -> low quality -> high quality)
 */
export const progressiveImageLoad = (container, lowSrc, highSrc) => {
  const img = new Image();
  const placeholder = container.querySelector('.placeholder');
  
  // Cargar imagen de baja calidad primero
  img.src = lowSrc;
  img.onload = () => {
    container.appendChild(img);
    img.classList.add('loading');
    
    // Luego cargar la de alta calidad
    const highQualityImg = new Image();
    highQualityImg.src = highSrc;
    highQualityImg.onload = () => {
      img.src = highSrc;
      img.classList.remove('loading');
      img.classList.add('loaded');
      if (placeholder) placeholder.remove();
    };
  };
};

// Inicializar al cargar el DOM
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initLazyLoading();
    
    // Precargar imágenes críticas (hero, logo)
    preloadCriticalImages([
      '/img/logoAclaradoAcorta.png',
      '/img/SanIsidroLima.jpg'
    ]);
  });
}
