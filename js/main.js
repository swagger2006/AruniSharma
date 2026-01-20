// Custom Cursor
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
let isHovered = false;

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
        isHovered = true;
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
        isHovered = false;
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

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

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

// Animated greeting text
const greetings = [
    'Bonjour',
    'Hola',
    'こんにちは',
    'नमस्ते',
    'Hello',
    'مرحبا',
    'Ciao',
    'Hallo',
    'Olá',
    'Привет'
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

// Initialize scroll animations
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

// Initialize animations on load
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Add click event listener for resume download button
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', function(e) {
            // Show loading state
            const originalText = this.textContent;
            this.textContent = 'Preparing...';
            this.classList.add('downloading');
            
            // Small delay to show the loading state
            setTimeout(() => {
                // The actual download is handled by the HTML download attribute
                // This is just for visual feedback
                this.textContent = 'Downloading...';
                
                // Revert back after a short delay
                setTimeout(() => {
                    this.textContent = 'Download Started!';
                    this.classList.remove('downloading');
                    this.classList.add('downloaded');
                    
                    // Revert back to original text after 2 seconds
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.classList.remove('downloaded');
                    }, 2000);
                }, 300);
            }, 100);
        });
    }
    
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize AOS (Animation on Scroll) if included
if (typeof AOS !== 'undefined') {
    // Initialize scroll animations
    initScrollAnimations();
}

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

// Back to top button functionality
if (backToTopButton) {
window.addEventListener('scroll', () => {
if (window.pageYOffset > 300) {
backToTopButton.classList.add('active');
} else {
backToTopButton.classList.remove('active');
}
});
}

// Contact form handling
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
            
// Check if EmailJS is available
if (typeof emailjs !== 'undefined') {
// Send email using EmailJS
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

// Show alert message
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate skill bars on page load if they're in view
    animateSkillBars();
});

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Reset all skill bars to 0 width
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Create intersection observer to animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('style').match(/width: (\d+)%/)[1];
                progressBar.style.width = targetWidth + '%';
                
                // Stop observing once animated
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });
    
    // Observe each skill bar
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Re-animate skill bars when navigating back to the skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(skillsSection);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic form validation
        if (!formValues.name || !formValues.email || !formValues.message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', formValues);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Initialize AOS (Animation on Scroll) if included
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 100
    });
}

// Add smooth scroll behavior for anchor links

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
