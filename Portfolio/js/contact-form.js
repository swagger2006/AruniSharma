document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Initialize EmailJS with your public key
    (function() {
        emailjs.init('iuLlpcip4Tx4isOlO');
    })();
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Get form data
        const formData = new FormData(this);
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('reply_to'),  // Map reply_to to from_email
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Send email using EmailJS with mapped parameters
        emailjs.send('service_vf5ze9r', 'template_t6400y4', templateParams)
            .then(function(response) {
                // Show success message
                showNotification(
                    '<i class="fas fa-check-circle"></i> Message Sent!',
                    'Thank you for reaching out! I\'ve received your message and will get back to you within 24-48 hours.',
                    'success'
                );
                // Reset form
                form.reset();
                // Add a subtle animation to the form
                form.style.animation = 'none';
                form.offsetHeight; // Trigger reflow
                form.style.animation = 'fadeIn 0.5s ease-out';
            }, function(error) {
                // Show error message
                showNotification(
                    '<i class="fas fa-exclamation-circle"></i> Oops!',
                    'Something went wrong while sending your message. Please try again or contact me directly at imparas07singh@gmail.com',
                    'error'
                );
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
    
    // Show notification function
    function showNotification(title, message, type = 'success') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${type === 'success' ? 
                        '<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' : 
                        '<svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>'
                    }
                </div>
                <div class="notification-text">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
                <button class="notification-close" aria-label="Close notification">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="notification-progress"></div>
        `;
        
        // Add notification to the form
        form.parentNode.insertBefore(notification, form);
        
        // Auto-remove notification after 5 seconds
        const removeNotification = () => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        };
        
        // Close button event
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', removeNotification);
        
        // Auto-remove after delay
        setTimeout(removeNotification, 5000);
    }
});
