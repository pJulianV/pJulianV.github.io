/**
 * Utilidad de sanitización para el frontend
 * Usa DOMPurify para limpiar inputs y prevenir XSS
 */

// Importar DOMPurify desde CDN (agregado en HTML)
// <script src="https://cdn.jsdelivr.net/npm/dompurify@3.0.8/dist/purify.min.js"></script>

/**
 * Sanitizar texto simple (sin HTML)
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export function sanitizeText(input) {
  if (typeof input !== 'string') {
    return '';
  }

  // Usar DOMPurify si está disponible
  if (typeof DOMPurify !== 'undefined') {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [], // No permitir ningún tag HTML
      KEEP_CONTENT: true, // Mantener el contenido de texto
    });
  }

  // Fallback: escape manual básico
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizar HTML (permitir solo tags seguros)
 * @param {string} input - HTML a sanitizar
 * @returns {string} HTML sanitizado
 */
export function sanitizeHTML(input) {
  if (typeof input !== 'string') {
    return '';
  }

  if (typeof DOMPurify !== 'undefined') {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
      ALLOWED_ATTR: ['href', 'title'],
    });
  }

  // Fallback: remover todo HTML
  return sanitizeText(input);
}

/**
 * Sanitizar URL
 * @param {string} url - URL a sanitizar
 * @returns {string} URL sanitizada
 */
export function sanitizeURL(url) {
  if (typeof url !== 'string') {
    return '';
  }

  try {
    const parsed = new URL(url);
    // Solo permitir protocolos seguros
    if (['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
      return parsed.href;
    }
  } catch (_e) {
    // URL inválida
  }

  return '';
}

/**
 * Sanitizar email
 * @param {string} email - Email a sanitizar
 * @returns {string} Email sanitizado
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') {
    return '';
  }

  // Remover espacios y convertir a minúsculas
  email = email.trim().toLowerCase();

  // Validar formato básico de email
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (emailRegex.test(email)) {
    return sanitizeText(email);
  }

  return '';
}

/**
 * Sanitizar teléfono
 * @param {string} phone - Teléfono a sanitizar
 * @returns {string} Teléfono sanitizado
 */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') {
    return '';
  }

  // Permitir solo números, espacios, +, -, (, )
  return phone.replace(/[^0-9\s+\-()]/g, '').trim();
}

/**
 * Sanitizar datos de formulario de contacto
 * @param {Object} formData - Datos del formulario
 * @returns {Object} Datos sanitizados
 */
export function sanitizeContactForm(formData) {
  return {
    nombre: sanitizeText(formData.nombre || ''),
    empresa: sanitizeText(formData.empresa || ''),
    email: sanitizeEmail(formData.email || ''),
    telefono: sanitizePhone(formData.telefono || ''),
    mensaje: sanitizeText(formData.mensaje || ''),
  };
}

/**
 * Validar y sanitizar input en tiempo real
 * @param {HTMLInputElement} input - Input element
 */
export function attachSanitizer(input) {
  if (!input) return;

  input.addEventListener('blur', function () {
    const type = this.getAttribute('data-sanitize') || 'text';

    switch (type) {
      case 'email':
        this.value = sanitizeEmail(this.value);
        break;
      case 'phone':
        this.value = sanitizePhone(this.value);
        break;
      case 'url':
        this.value = sanitizeURL(this.value);
        break;
      default:
        this.value = sanitizeText(this.value);
    }
  });
}

/**
 * Inicializar sanitización automática en formularios
 */
export function initFormSanitization() {
  // Sanitizar todos los inputs con atributo data-sanitize
  document.querySelectorAll('[data-sanitize]').forEach((input) => {
    attachSanitizer(input);
  });

  // Sanitizar formularios al enviar
  document.querySelectorAll('form').forEach((form) => {
    form.addEventListener('submit', function (_e) {
      // Sanitizar todos los inputs del formulario
      this.querySelectorAll('input, textarea').forEach((input) => {
        if (input.type !== 'submit' && input.type !== 'button') {
          input.value = sanitizeText(input.value);
        }
      });
    });
  });
}

// Inicializar automáticamente cuando el DOM esté listo
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormSanitization);
  } else {
    initFormSanitization();
  }
}
