// Experience Section Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
    if (!experienceCards.length) return;
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    let visibleCount = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                // Add staggered delay based on order
                const delay = visibleCount * 150; // 150ms delay between each card
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                visibleCount++;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all experience cards
    experienceCards.forEach(card => {
        observer.observe(card);
    });
});
