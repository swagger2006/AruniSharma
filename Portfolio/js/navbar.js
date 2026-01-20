document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('section');
    
    // Mobile menu toggle
    function toggleMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = 
            navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    // Close mobile menu when clicking a link
    function closeMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Handle scroll events
    let lastScroll = 0;
    const navHeight = nav.offsetHeight;
    
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 10) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > navHeight) {
            // Scrolling down
            nav.style.transform = `translateY(-${navHeight}px)`;
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        
        // Update active section
        setActiveLink();
    }
    
    // Set active link based on scroll position
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll for anchor links
    function smoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
            top: targetElement.offsetTop - 90,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMenu();
    }
    
    // Event Listeners
    navToggle.addEventListener('click', toggleMenu);
    
    // Add smooth scroll to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Handle scroll events with throttling
    let isScrolling;
    window.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(handleScroll, 100);
    }, false);
    
    // Initialize
    handleScroll();
});
