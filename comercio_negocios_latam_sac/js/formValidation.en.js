// English Contact Form Handler for /en/pages/contact.html
const API_URL = 'https://julianvargasdev.com';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contacto-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmitEn);
  }
});

async function handleFormSubmitEn(e) {
  e.preventDefault();
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;

  const formData = {
    nombre: form.nombre.value.trim(),
    empresa: form.empresa.value.trim(),
    email: form.email.value.trim(),
    telefono: form.telefono?.value.trim() || '',
    mensaje: form.mensaje.value.trim()
  };

  const validationErrors = validateFormEn(formData);
  if (validationErrors.length > 0) {
    showErrorsEn(validationErrors);
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  submitButton.style.opacity = '0.7';

  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    if (result.success) {
      showSuccessEn('Message sent successfully! We will contact you soon.');
      form.reset();
    } else {
      showErrorsEn([result.message || 'Error sending message']);
    }
  } catch (error) {
    showErrorsEn(['Connection error. Please try again later.']);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.style.opacity = '1';
  }
}

function validateFormEn(data) {
  const errors = [];
  if (!data.nombre || data.nombre.length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (data.nombre.length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }
  if (!data.empresa || data.empresa.length < 2) {
    errors.push('Company name must be at least 2 characters');
  }
  if (data.empresa.length > 100) {
    errors.push('Company name cannot exceed 100 characters');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Please enter a valid email');
  }
  if (data.telefono) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(data.telefono)) {
      errors.push('Phone must contain only valid numbers and symbols');
    }
  }
  if (!data.mensaje || data.mensaje.length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  if (data.mensaje.length > 1000) {
    errors.push('Message cannot exceed 1000 characters');
  }
  return errors;
}

function showErrorsEn(errors) {
  removeMessagesEn();
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
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => messageDiv.remove(), 5000);
}

function showSuccessEn(message) {
  removeMessagesEn();
  const form = document.querySelector('.contacto-form');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'form-message form-success';
  messageDiv.innerHTML = `<strong>✅ Success:</strong> ${message}`;
  form.insertBefore(messageDiv, form.firstChild);
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => messageDiv.remove(), 5000);
}

function removeMessagesEn() {
  document.querySelectorAll('.form-message').forEach(msg => msg.remove());
}

// Real-time validation (optional, similar to ES)
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contacto-form');
  if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateFieldEn(this);
      });
      input.addEventListener('input', function() {
        this.classList.remove('field-error');
        const errorMsg = this.parentElement.querySelector('.field-error-msg');
        if (errorMsg) errorMsg.remove();
      });
    });
  }
});

function validateFieldEn(field) {
  const value = field.value.trim();
  let error = null;
  field.classList.remove('field-error');
  const existingError = field.parentElement.querySelector('.field-error-msg');
  if (existingError) existingError.remove();
  switch(field.name) {
    case 'nombre':
      if (!value || value.length < 2) {
        error = 'Name must be at least 2 characters';
      }
      break;
    case 'empresa':
      if (!value || value.length < 2) {
        error = 'Company must be at least 2 characters';
      }
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        error = 'Invalid email';
      }
      break;
    case 'telefono':
      if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
        error = 'Invalid phone';
      }
      break;
    case 'mensaje':
      if (!value || value.length < 10) {
        error = 'Message must be at least 10 characters';
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
