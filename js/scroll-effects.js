// Initialize Intersection Observer for scroll animations
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections with animation classes
    document.querySelectorAll('.section-padding, .hero-content, .project-card, .skill-item, .timeline-item, .achievement-item, .education-item').forEach(section => {
        observer.observe(section);
    });
};

// Parallax effect for hero section with throttling
const initParallax = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let lastParallaxUpdate = 0;
    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastParallaxUpdate < 16) return; // 60fps throttle
        lastParallaxUpdate = now;
        
        const x = (window.innerWidth / 2 - e.pageX) / 20;
        const y = (window.innerHeight / 2 - e.pageY) / 20;
        hero.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
};

// Smooth scroll for anchor links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Add hover effect to project cards
const initProjectHover = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const content = card.querySelector('.project-content');
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            content.style.transform = 'translateZ(30px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            content.style.transform = 'translateZ(0)';
        });
    });
};

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
};

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initScrollAnimations();
    initSmoothScroll();
    
    // Only initialize hover effects on non-touch devices
    if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
        initParallax();
        initProjectHover();
    }
    
    // Initialize skill bars
    animateSkillBars();
    
    // Trigger initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Force reflow to ensure animations trigger
        document.querySelectorAll('.hero-content > *').forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
            el.style.opacity = '1';
        });
    }, 100);
    
    // Add consolidated scroll event handler
    let rafPending = false;
    window.addEventListener('scroll', () => {
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(() => {
                handleHeaderScroll();
                rafPending = false;
            });
        }
    }, { passive: true });
});

// Handle scroll events for header with RAF
let lastScroll = 0;
const header = document.querySelector('header');

function handleHeaderScroll() {
    const currentScroll = window.pageYOffset;
    
    if (!header) return;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
    } else if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
}

