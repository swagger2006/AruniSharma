// Clean, Smooth Project Section - Truus.co Inspired
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item-clean');
    const projectLinks = document.querySelectorAll('.project-link-clean');
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const modalClose = document.querySelector('.modal-close-clean');
    const modalOverlay = document.querySelector('.modal-overlay-clean');
    
    // Project Details Data
    const projectDetails = {
        roomwati: {
            title: 'RoomWati',
            category: 'Full Stack Web Application',
            description: 'A comprehensive room booking platform built with the MERN stack. Features real-time availability checking, secure user authentication with JWT, and a powerful admin dashboard for managing bookings and rooms efficiently.',
            features: [
                'Real-time room availability checking',
                'Secure JWT-based authentication system',
                'Comprehensive admin dashboard',
                'Responsive design for all devices',
                'Email notifications for bookings',
                'Payment integration ready architecture'
            ],
            technologies: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'JWT', 'Bcrypt'],
            liveUrl: 'https://roomwati.onrender.com',
            githubUrl: 'https://github.com/shourya9058/RoomWati'
        },
        feelit: {
            title: 'Feelit Music Player',
            category: 'Frontend Web Application',
            description: 'A modern, minimal web music player featuring a beautiful user interface with light/dark theme toggle. Built entirely with vanilla HTML, CSS, and JavaScript, demonstrating clean code architecture and smooth user experience.',
            features: [
                'Clean and intuitive user interface',
                'Seamless light/dark theme toggle',
                'Advanced playlist management',
                'Smooth animations and transitions',
                'Fully responsive design',
                'Local storage for user preferences'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Font Awesome', 'Local Storage API'],
            liveUrl: 'https://feelit-music-player.onrender.com',
            githubUrl: 'https://github.com/shourya9058/Feelit'
        },
        twogood: {
            title: 'Two Good Co Clone',
            category: 'UI/UX Clone Project',
            description: 'A pixel-perfect recreation of the Two Good Co website, showcasing advanced frontend development skills. Features smooth scroll animations powered by GSAP and a fully responsive design that works flawlessly across all devices.',
            features: [
                'Pixel-perfect design replication',
                'Smooth scroll animations with GSAP',
                'Fully responsive layout system',
                'Optimized performance metrics',
                'Cross-browser compatibility',
                'Modern CSS Grid and Flexbox techniques'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Flexbox', 'CSS Grid'],
            liveUrl: 'https://shourya9058.github.io/Two-Good-Co-Clone/',
            githubUrl: '#'
        },
        astralock: {
            title: 'AstraLock Extension',
            category: 'Browser Extension',
            description: 'A Chrome extension designed to enhance browser security with password protection and session management features. Provides users with peace of mind through automatic session locking and customizable privacy settings.',
            features: [
                'Password protection for browser sessions',
                'Automatic session locking mechanism',
                'Privacy mode for incognito browsing',
                'Customizable security settings',
                'Clean, user-friendly interface',
                'Lightweight and performant'
            ],
            technologies: ['JavaScript', 'Chrome Extension API', 'HTML5', 'CSS3', 'Local Storage'],
            liveUrl: '#',
            githubUrl: '#'
        }
    };
    
    // Smooth Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    let visibleCount = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                const delay = visibleCount * 100;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                
                visibleCount++;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe project items
    projectItems.forEach(item => {
        observer.observe(item);
    });
    
    // Project Link Click - Open Modal
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            openModal(projectId);
        });
    });
    
    // Open Modal Function
    function openModal(projectId) {
        const project = projectDetails[projectId];
        if (!project) return;
        
        // Get video source
        const videoSrc = `videos/${projectId}-demo.mp4`;
        
        const content = `
            <span class="modal-category">${project.category}</span>
            <h2>${project.title}</h2>
            
            <div class="modal-video-showcase">
                <video autoplay loop muted playsinline>
                    <source src="${videoSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            
            <p>${project.description}</p>
            
            <h3>Key Features</h3>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            
            <h3>Technologies Used</h3>
            <div class="modal-tech-list">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            
            <div class="modal-links-clean">
                <a href="${project.liveUrl}" class="modal-btn-clean" target="_blank" rel="noopener noreferrer">
                    View Live Demo
                </a>
                <a href="${project.githubUrl}" class="modal-btn-clean secondary" target="_blank" rel="noopener noreferrer">
                    View Source Code
                </a>
            </div>
        `;
        
        modalContent.innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close Modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
