// Universal Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
        .fade-in-up,
        .featured-project,
        .about-content,
        .skill-item,
        .education-item,
        .contact-item,
        .section-header,
        .section-header-minimal
    `);
    
    if (!animatedElements.length) return;
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                entry.target.classList.add('visible');
                // Don't unobserve so animation can repeat if needed
            }
        });
    }, observerOptions);
    
    // Observe all elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Enhanced Modal with Smooth Popup Effect
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    
    const modalClose = document.querySelector('.modal-close-clean');
    const modalOverlay = document.querySelector('.modal-overlay-clean');
    
    // Store original close function
    const originalCloseModal = window.closeModal;
    
    // Enhanced close with animation
    window.closeModal = function() {
        if (!modal) return;
        
        // Add closing class for animation
        modal.classList.add('closing');
        
        // Wait for animation to complete
        setTimeout(() => {
            modal.classList.remove('active');
            modal.classList.remove('closing');
            document.body.style.overflow = '';
        }, 300);
    };
    
    // Close on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', window.closeModal);
    }
    
    // Close on close button click
    if (modalClose) {
        modalClose.addEventListener('click', window.closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            window.closeModal();
        }
    });
    
    // Prevent body scroll when modal is open
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (modal.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
    
    observer.observe(modal, { attributes: true });
});
