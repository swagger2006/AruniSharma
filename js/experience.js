// Experience Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline animation
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        // Add animation class to timeline after a short delay
        setTimeout(() => {
            timeline.classList.add('animate');
        }, 500);
    }
    
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Function to check if element is in viewport
    const isInViewport = (element, offset = 0) => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= (viewportHeight * 0.8) &&
            rect.bottom >= (viewportHeight * 0.2)
        );
    };

    // Function to handle scroll events
    const handleScroll = () => {
        // Animate timeline items
        timelineItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('visible')) {
                // Stagger the animation with a delay based on index
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            }
        });
        
        // Animate skill items
        skillItems.forEach((item, index) => {
            if (isInViewport(item) && !item.classList.contains('visible')) {
                // Stagger the animation with a delay based on index
                setTimeout(() => {
                    item.classList.add('visible');
                }, (index % 6) * 100);
            }
        });
    };

    // Add scroll event listener with improved debounce
    let rafPending = false;
    window.addEventListener('scroll', () => {
        if (!rafPending) {
            rafPending = true;
            requestAnimationFrame(() => {
                handleScroll();
                rafPending = false;
            });
        }
    }, { passive: true });
    
    // Check on initial load
    handleScroll();
    
    // Add hover effect to skill items
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) scale(1.03)';
            item.style.boxShadow = '0 15px 30px rgba(138, 43, 226, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            if (item.classList.contains('visible')) {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    });

    // Add floating elements
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
        // Add floating elements
        const floatingElements = [
            { class: 'floating-element-1' },
            { class: 'floating-element-2' },
            { class: 'floating-element-3' }
        ];

        floatingElements.forEach((el, index) => {
            const element = document.createElement('div');
            element.className = `floating-element ${el.className}`;
            experienceSection.appendChild(element);
        });
    }

    // Add parallax effect to background elements with throttling
    const parallaxElements = document.querySelectorAll('.section-bg > *');
    
    let lastParallaxScroll = 0;
    const handleParallax = () => {
        const now = Date.now();
        if (now - lastParallaxScroll < 16) return; // 60fps throttle
        lastParallaxScroll = now;
        
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollPosition * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });
    window.addEventListener('resize', handleParallax);

    // Add hover effect to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-content').style.transform = 'translateY(-10px)';
            item.querySelector('.timeline-content').style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-content').style.transform = 'translateY(0)';
            item.querySelector('.timeline-content').style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Add ripple effect to timeline items
    timelineItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});
