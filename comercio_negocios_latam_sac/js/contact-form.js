// Contact Form Handler (Portfolio Style) for Comercio Negocios Latam
// Modern feedback and UX, similar to portfolio

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contacto-form');
    if (!form) return;
    // Add a message container if not present
    let formMessage = document.getElementById('formMessage');
    if (!formMessage) {
        formMessage = document.createElement('div');
        formMessage.id = 'formMessage';
        formMessage.className = 'form-message';
        form.appendChild(formMessage);
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    // Add a span for button text if not present
    let btnText = submitBtn.querySelector('.btn-text');
    if (!btnText) {
        btnText = document.createElement('span');
        btnText.className = 'btn-text';
        btnText.textContent = submitBtn.textContent;
        submitBtn.textContent = '';
        submitBtn.appendChild(btnText);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        hideMessage();
        // Get form data
        const formData = {
            nombre: form.nombre.value.trim(),
            empresa: form.empresa.value.trim(),
            email: form.email.value.trim(),
            telefono: form.telefono.value.trim(),
            mensaje: form.mensaje.value.trim()
        };
        try {
            const response = await fetch('https://julianvargasdev.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok && (result.success || result.message)) {
                showMessage('success', 'Message sent successfully! We will contact you soon.');
                form.reset();
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('error', 'Failed to send message. Please try again later or email info@cynlatam.com');
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
        }
    });

    function showMessage(type, text) {
        formMessage.className = `form-message show ${type}`;
        formMessage.textContent = text;
    }
    function hideMessage() {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }

    // Input validation and feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });
        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
    // Email validation
    const emailInput = form.email;
    emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#ef4444';
            showMessage('error', 'Please enter a valid email address');
        }
    });
});
