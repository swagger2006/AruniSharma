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
        ShareBite: {
            title: 'ShareBite',
            category: 'Full Stack Web Application',
            description: 'A comprehensive surplus food distribution platform built with a full-stack architecture. It enables real-time food availability tracking, secure JWT-based authentication, and an efficient admin dashboard to manage donations, pickups, and users seamlessly.',
features: [
    'Real-time surplus food availability tracking',
    'Secure JWT-based authentication system',
    'Role-based access for donors, NGOs, and volunteers',
    'Comprehensive admin dashboard for food and user management',
    'Location-based pickup and distribution coordination',
    'Responsive design for all devices'
],
            technologies: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'JWT', 'Bcrypt'],
            liveUrl: 'https://github.com/swagger2006/ShareBite',
            githubUrl: 'https://github.com/swagger2006/ShareBite'
        },
        feelit: {
            title: 'CafeConnect ',
            category: 'Full Stack Web Application',
            description: 'Designed and developed a web-based cafeteria food ordering system to digitize menu browsing and order placement, reducing manual effort and queue time.',
            features: [
                'Clean and intuitive user interface',
                'Real-time order status tracking',
                'Online food ordering via mobile or desktop',
                'Admin dashboard for menu and order management',
                'Fully responsive design',
                'Local storage for user preferences'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Font Awesome', 'Local Storage API'],
            liveUrl: 'https://github.com/swagger2006',
            githubUrl: 'https://github.com/swagger2006'
        },
        twogood: {
            title: 'Hospital Management System',
            category: 'Full Stack Project',
            description: 'Designed and developed a web-based Hospital Management System to digitize patient records, appointments, and hospital operations., showcasing advanced frontend development skills. Features smooth scroll animations powered by GSAP and a fully responsive design that works flawlessly across all devices.',
            features: [
                'Implemented secure role-based authentication for admins, doctors, and staff to ensure data privacy and controlled access.',
                'Built modules for patient registration, appointment scheduling, and doctor assignment to streamline hospital workflows.',
                'Fully responsive layout system',
                'Optimized performance metrics',
                'Cross-browser compatibility',
                'Modern CSS Grid and Flexbox techniques'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Flexbox', 'CSS Grid'],
            liveUrl: 'https://github.com/swagger2006',
            githubUrl: 'https://github.com/swagger2006'
        },
        astralock: {
            title: 'RefineryIQ',
            category: 'AI-Driven Energy & Safety Intelligence Platform',
            description: 'Designed and developed Refinery IQ, an AI-driven intelligence platform to monitor, analyze, and optimize energy consumption and safety metrics in refinery operations.',
            features: [
                'Real-time refinery energy and production monitoring',
                'AI-driven analytics for efficiency and loss detection',
                'Automated KPI calculation and performance insights',
                'Anomaly detection for safety and operational risks',
                'Interactive dashboards with clear visualizations',
                'Scalable and high-performance data processing'
            ],
            technologies: ['Python', 'NumPy', 'Pandas', 'Chrome Extension API', 'ML', 'React', 'Local Storage', 'JWT'],
            liveUrl: 'https://github.com/swagger2006',
            githubUrl: 'https://github.com/swagger2006'
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
