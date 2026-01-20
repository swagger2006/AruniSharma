// Interactive Space Hero Background
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    // Create Canvas for Particles
    const canvas = document.createElement('canvas');
    canvas.id = 'space-canvas';
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle System
    const particles = [];
    const particleCount = 150;
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = `rgba(138, 43, 226, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Mouse Interaction
    let mouse = { x: null, y: null, radius: 150 };
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        
        // Create particle trail
        createTrailParticle(e.clientX, e.clientY);
    });
    
    hero.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Particle Trail Effect
    function createTrailParticle(x, y) {
        const trail = document.createElement('div');
        trail.className = 'particle-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
    }
    
    // Connect Particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(138, 43, 226, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Mouse Interaction with Particles
    function interactWithMouse() {
        if (mouse.x && mouse.y) {
            particles.forEach(particle => {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 3;
                    particle.y -= Math.sin(angle) * force * 3;
                }
            });
        }
    }
    
    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        interactWithMouse();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Create Floating Orbs
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'floating-orbs';
    orbsContainer.innerHTML = `
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
    `;
    hero.insertBefore(orbsContainer, hero.firstChild);
    
    // Create Shooting Stars
    const shootingStars = document.createElement('div');
    shootingStars.className = 'shooting-stars';
    shootingStars.innerHTML = `
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
    `;
    hero.insertBefore(shootingStars, hero.firstChild);
    
    // Create Animated Grid
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'grid-overlay-hero';
    hero.insertBefore(gridOverlay, hero.firstChild);
    
    // Create Twinkling Stars
    const starsLayer = document.createElement('div');
    starsLayer.className = 'stars-layer';
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsLayer.appendChild(star);
    }
    
    hero.insertBefore(starsLayer, hero.firstChild);
    
    // Resize Handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
