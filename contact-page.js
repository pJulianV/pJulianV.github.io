// Contact Form Handler with Resend Integration
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        hideMessage();

        // Get form data
        const formData = {
            firstName: form.firstName.value.trim(),
            lastName: form.lastName.value.trim(),
            email: form.email.value.trim(),
            company: form.company.value.trim(),
            subject: form.subject.value,
            message: form.message.value.trim()
        };

        try {
            // Send to Cloudflare Worker endpoint
            const response = await fetch('https://julianvargasdev.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
                form.reset();
                
                // Track successful submission (if you use analytics)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        event_category: 'Contact',
                        event_label: 'Success'
                    });
                }
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('error', 'Failed to send message. Please try emailing me directly at julian.vargasdev@gmail.com');
            
            // Track failed submission (if you use analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_error', {
                    event_category: 'Contact',
                    event_label: error.message
                });
            }
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        }
    });

    function showMessage(type, text) {
        formMessage.className = `form-message show ${type}`;
        formMessage.textContent = text;
    }

    function hideMessage() {
        formMessage.className = 'form-message';
    }

    // Input validation and feedback
    const inputs = form.querySelectorAll('input, textarea, select');
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
