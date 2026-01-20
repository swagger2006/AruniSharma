// ==========================================
// CUSTOM CURSOR
// ==========================================
const cursor = document.createElement('div');
const cursorFollower = document.createElement('div');
cursor.classList.add('cursor');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursor);
document.body.appendChild(cursorFollower);

// Update cursor position
let mouseX = 0;
let mouseY = 0;
let followerX = 0;
let followerY = 0;

// Custom cursor movement with smooth following
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    
    // Smooth follow for the follower
    const diffX = mouseX - followerX;
    const diffY = mouseY - followerY;
    
    followerX += diffX * 0.1;
    followerY += diffY * 0.1;
    
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;
});

// Add hover effect for clickable elements
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .timeline-content, .achievement-item, .education-content, .btn, input[type="submit"], input[type="button"]');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Add click effect
document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
    cursorFollower.classList.add('click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
    cursorFollower.classList.remove('click');
});

// Hide cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Add cursor effect when menu is toggled
        if (navLinks.classList.contains('active')) {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        } else {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        }
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ==========================================
// ANIMATED GREETING TEXT
// ==========================================
const greetings = [
    'Bonjour', 'Hola', 'こんにちは', 'नमस्ते', 'Hello',
    'مرحبا', 'Ciao', 'Hallo', 'Olá', 'Привет'
];

let currentGreeting = 0;
const greetingElement = document.getElementById('greeting-text');

function updateGreeting() {
    if (!greetingElement) return;
    
    greetingElement.style.opacity = '0';
    
    setTimeout(() => {
        currentGreeting = (currentGreeting + 1) % greetings.length;
        greetingElement.textContent = greetings[currentGreeting];
        greetingElement.style.opacity = '1';
    }, 500);
}

// Change greeting every 3 seconds
if (greetingElement) {
    setInterval(updateGreeting, 3000);
    updateGreeting(); // Initial call
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Unobserve after animation if not set to repeat
                if (entry.target.dataset.aosOnce !== 'false') {
                    observer.unobserve(entry.target);
                }
            } else if (entry.target.dataset.aosOnce === 'false') {
                entry.target.classList.remove('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================
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

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// CONTACT FORM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {
                from_name: formData.get('from_name'),
                reply_to: formData.get('reply_to'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send(
                    'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
                    'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
                    formObject,
                    'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
                )
                .then((response) => {
                    showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('Failed to send message:', error);
                    showAlert('Failed to send message. Please try again later or contact me directly at imparas07singh@gmail.com', 'error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = btnText;
                });
            } else {
                // Fallback if EmailJS is not loaded
                console.warn('EmailJS not loaded. Form submission disabled.');
                showAlert('Form submission is currently unavailable. Please contact me directly at imparas07singh@gmail.com', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = btnText;
            }
        });
    }
});

// ==========================================
// SHOW ALERT MESSAGE
// ==========================================
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Add styles
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    alertDiv.style.padding = '15px 25px';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.color = '#fff';
    alertDiv.style.fontWeight = '500';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.animation = 'slideIn 0.3s ease-out';
    
    if (type === 'success') {
        alertDiv.style.backgroundColor = '#4CAF50';
    } else {
        alertDiv.style.backgroundColor = '#F44336';
    }
    
    document.body.appendChild(alertDiv);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 300);
    }, 5000);
}

// Add keyframe animations for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translate(-50%, -50px); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -50px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==========================================
// INITIALIZE ANIMATIONS ON LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add animation classes to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.setAttribute('data-aos', 'fade-up');
        section.setAttribute('data-aos-delay', (index * 100) + 'ms');
    });
    
    // Add animation to project cards
    const projects = document.querySelectorAll('.project-card');
    projects.forEach((project, index) => {
        project.setAttribute('data-aos', 'fade-up');
        project.setAttribute('data-aos-delay', (index * 100) + 'ms');
    });
    
    // Add animation to skill items
    const skills = document.querySelectorAll('.skill-item');
    skills.forEach((skill, index) => {
        skill.setAttribute('data-aos', 'fade-up');
        skill.setAttribute('data-aos-delay', (index * 50) + 'ms');
    });
});

// ==========================================
// ANIMATE SKILL BARS ON SCROLL
// ==========================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('style').match(/width: (\d+)%/)[1];
                progressBar.style.width = targetWidth + '%';
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize skill bars animation when skills section is in view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(skillsSection);
}

// ==========================================
// REVEAL SECTIONS ON SCROLL
// ==========================================
function revealSections() {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll reveal
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
