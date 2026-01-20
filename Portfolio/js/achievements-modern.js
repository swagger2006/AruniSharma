// Modern Achievements Section with Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    const achievementCards = document.querySelectorAll('.achievement-card-modern');
    
    if (!achievementCards.length) return;
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all achievement cards
    achievementCards.forEach(card => {
        observer.observe(card);
        
        // Mouse move effect for glow
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glow = card.querySelector('.achievement-glow-effect');
            if (glow) {
                glow.style.transform = `translate(${x - rect.width}px, ${y - rect.height}px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.achievement-glow-effect');
            if (glow) {
                glow.style.transform = 'translate(0, 0)';
            }
        });
    });
});
