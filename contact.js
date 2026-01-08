// Contact form handling
const API_URL = window.location.origin.includes('localhost') 
  ? 'http://localhost:3000' 
  : 'https://julianvargasdev-api.onrender.com';

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
});

async function handleContactSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const messageDiv = document.getElementById('form-message');
  const originalButtonText = submitButton.textContent;
  
  // Get form data
  const formData = {
    nombre: form.nombre.value.trim(),
    email: form.email.value.trim(),
    mensaje: form.mensaje.value.trim()
  };
  
  // Disable button and show loading
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  submitButton.style.opacity = '0.6';
  messageDiv.textContent = '';
  messageDiv.className = 'form-message';
  
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      messageDiv.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
      messageDiv.className = 'form-message success';
      form.reset();
    } else {
      messageDiv.textContent = '❌ ' + (result.message || 'Error sending message. Please try again.');
      messageDiv.className = 'form-message error';
    }
    
  } catch (error) {
    console.error('Error:', error);
    messageDiv.textContent = '❌ Connection error. Please try again later.';
    messageDiv.className = 'form-message error';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
    submitButton.style.opacity = '1';
  }
}
