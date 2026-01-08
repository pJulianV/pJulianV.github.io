// Manejo del formulario de contacto

// URL del backend - usar ruta relativa ya que frontend y backend están juntos
const API_URL = window.location.origin;

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contacto-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});

/**
 * Manejar el envío del formulario
 */
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Obtener los datos del formulario
  const formData = {
    nombre: form.nombre.value.trim(),
    empresa: form.empresa.value.trim(),
    email: form.email.value.trim(),
    telefono: form.telefono?.value.trim() || '',
    mensaje: form.mensaje.value.trim()
  };
  
  // Validar formulario
  const validationErrors = validateForm(formData);
  
  if (validationErrors.length > 0) {
    showErrors(validationErrors);
    return;
  }
  
  // Deshabilitar botón y mostrar loading
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';
  submitButton.style.opacity = '0.7';
  
  try {
    // Enviar al backend
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      showSuccess('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
      form.reset();
    } else {
      showErrors([result.message || 'Error al enviar el mensaje']);
    }
    
  } catch (error) {
    console.error('Error:', error);
    showErrors(['Error de conexión. Por favor, intenta nuevamente más tarde.']);
  } finally {
    // Restaurar botón
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.style.opacity = '1';
  }
}

/**
 * Validar formulario
 */
function validateForm(data) {
  const errors = [];
  
  // Validar nombre
  if (!data.nombre || data.nombre.length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }
  if (data.nombre.length > 100) {
    errors.push('El nombre no puede exceder 100 caracteres');
  }
  
  // Validar empresa
  if (!data.empresa || data.empresa.length < 2) {
    errors.push('El nombre de la empresa debe tener al menos 2 caracteres');
  }
  if (data.empresa.length > 100) {
    errors.push('El nombre de la empresa no puede exceder 100 caracteres');
  }
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Por favor, ingresa un email válido');
  }
  
  // Validar teléfono (opcional)
  if (data.telefono) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.telefono)) {
      errors.push('El teléfono debe contener solo números y símbolos válidos');
    }
  }
  
  // Validar mensaje
  if (!data.mensaje || data.mensaje.length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }
  if (data.mensaje.length > 1000) {
    errors.push('El mensaje no puede exceder 1000 caracteres');
  }
  
  return errors;
}

/**
 * Mostrar errores en la interfaz
 */
function showErrors(errors) {
  // Eliminar mensajes anteriores
  removeMessages();
  
  const form = document.querySelector('.contacto-form');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'form-message form-error';
  messageDiv.innerHTML = `
    <strong>⚠️ Error:</strong>
    <ul>
      ${errors.map(error => `<li>${error}</li>`).join('')}
    </ul>
  `;
  
  form.insertBefore(messageDiv, form.firstChild);
  
  // Scroll al mensaje
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Auto-eliminar después de 5 segundos
  setTimeout(() => messageDiv.remove(), 5000);
}

/**
 * Mostrar mensaje de éxito
 */
function showSuccess(message) {
  removeMessages();
  
  const form = document.querySelector('.contacto-form');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'form-message form-success';
  messageDiv.innerHTML = `
    <strong>✅ Éxito:</strong> ${message}
  `;
  
  form.insertBefore(messageDiv, form.firstChild);
  
  // Scroll al mensaje
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Auto-eliminar después de 5 segundos
  setTimeout(() => messageDiv.remove(), 5000);
}

/**
 * Eliminar mensajes anteriores
 */
function removeMessages() {
  document.querySelectorAll('.form-message').forEach(msg => msg.remove());
}

// Validación en tiempo real
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contacto-form');
  
  if (form) {
    // Agregar validación en blur para cada campo
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      // Limpiar error al escribir
      input.addEventListener('input', function() {
        this.classList.remove('field-error');
        const errorMsg = this.parentElement.querySelector('.field-error-msg');
        if (errorMsg) errorMsg.remove();
      });
    });
  }
});

/**
 * Validar campo individual
 */
function validateField(field) {
  const value = field.value.trim();
  let error = null;
  
  // Limpiar errores anteriores
  field.classList.remove('field-error');
  const existingError = field.parentElement.querySelector('.field-error-msg');
  if (existingError) existingError.remove();
  
  switch(field.name) {
    case 'nombre':
      if (!value || value.length < 2) {
        error = 'El nombre debe tener al menos 2 caracteres';
      }
      break;
    case 'empresa':
      if (!value || value.length < 2) {
        error = 'La empresa debe tener al menos 2 caracteres';
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        error = 'Email inválido';
      }
      break;
    case 'telefono':
      if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
        error = 'Teléfono inválido';
      }
      break;
    case 'mensaje':
      if (!value || value.length < 10) {
        error = 'El mensaje debe tener al menos 10 caracteres';
      }
      break;
  }
  
  if (error) {
    field.classList.add('field-error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error-msg';
    errorDiv.textContent = error;
    field.parentElement.appendChild(errorDiv);
  }
}
