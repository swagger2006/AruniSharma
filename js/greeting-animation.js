class GreetingAnimation {
    constructor() {
        this.greetings = [
            { text: 'Hello', lang: 'English' },
            { text: 'नमस्ते', lang: 'Hindi' },
            { text: 'Hola', lang: 'Spanish' },
            { text: 'Bonjour', lang: 'French' },
            { text: 'こんにちは', lang: 'Japanese' },
            { text: 'Ciao', lang: 'Italian' },
            { text: 'Hallo', lang: 'German' },
            { text: 'Olá', lang: 'Portuguese' },
            { text: 'Привет', lang: 'Russian' },
            { text: 'مرحبا', lang: 'Arabic' }
        ];
        
        this.currentIndex = 0;
        this.container = document.querySelector('.greeting-container');
        
        if (!this.container) return;
        
        // Create elements
        this.createElements();
        
        // Set initial greeting
        this.updateGreeting();
        
        // Start the animation loop
        this.startAnimation();
    }
    
    createElements() {
        // Create text element
        this.textElement = document.createElement('span');
        this.textElement.className = 'greeting-text';
        this.textElement.textContent = this.greetings[0].text;
        
        // Clear container and append text element
        this.container.innerHTML = '';
        this.container.appendChild(this.textElement);
    }
    
    updateGreeting() {
        const currentGreeting = this.greetings[this.currentIndex];
        this.textElement.textContent = currentGreeting.text;
        
        // Create new elements for the next greeting
        const newTextElement = document.createElement('span');
        newTextElement.className = 'greeting-text';
        newTextElement.textContent = currentGreeting.text;
        
        const newLangElement = document.createElement('span');
        newLangElement.className = 'greeting-lang';
        newLangElement.textContent = currentGreeting.lang;
        
        // Create wrapper for the new text
        const newTextWrapper = document.createElement('span');
        newTextWrapper.className = 'text-wrapper';
        newTextWrapper.style.display = 'inline-block';
        newTextWrapper.style.position = 'relative';
        newTextWrapper.style.overflow = 'visible';
        
        // Add dust particles container
        const dustParticles = document.createElement('div');
        dustParticles.className = 'dust-particles';
        dustParticles.style.position = 'absolute';
        dustParticles.style.top = '0';
        dustParticles.style.left = '0';
        dustParticles.style.width = '100%';
        dustParticles.style.height = '100%';
        dustParticles.style.overflow = 'hidden';
        dustParticles.style.pointerEvents = 'none';
        
        // Add particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'rgba(255, 255, 255, 0.8)';
            particle.style.borderRadius = '50%';
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
            particle.style.transition = 'all 0.8s ease-out';
            dustParticles.appendChild(particle);
        }
        
        newTextWrapper.appendChild(newTextElement);
        newTextWrapper.appendChild(dustParticles);
        
        // Replace old elements with new ones
        this.container.innerHTML = '';
        this.container.appendChild(newTextWrapper);
        this.container.appendChild(newLangElement);
        
        // Trigger reflow to ensure styles are applied
        void this.container.offsetWidth;
        
        // Animate in new elements
        newTextElement.classList.add('dust-in');
        newLangElement.style.opacity = '0.7';
        
        // Animate dust particles
        const particles = dustParticles.querySelectorAll('div');
        particles.forEach(particle => {
            // Random position within text bounds
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = 2 + Math.random() * 3;
            const delay = Math.random() * 0.5;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.transition = `all ${0.5 + Math.random() * 0.5}s ease-out ${delay}s`;
            
            setTimeout(() => {
                particle.style.opacity = '0.8';
                particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(1)`;
                
                // Fade out particles
                setTimeout(() => {
                    particle.style.opacity = '0';
                    particle.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`;
                }, 300);
            }, 10);
        });
        
        // Update references
        this.textElement = newTextElement;
        this.langElement = newLangElement;
    }
    
    getNextGreetingIndex() {
        const currentText = this.greetings[this.currentIndex].text.toLowerCase();
        let nextIndex;
        let attempts = 0;
        const maxAttempts = this.greetings.length * 2; // Prevent infinite loops
        
        do {
            // Try to find a greeting that's different enough
            nextIndex = Math.floor(Math.random() * this.greetings.length);
            const nextText = this.greetings[nextIndex].text.toLowerCase();
            
            // Check if the next greeting is too similar to the current one
            const isTooSimilar = 
                nextText === currentText || 
                (currentText.includes('hello') && nextText.includes('hi')) ||
                (currentText.includes('hola') && nextText.includes('hello')) ||
                (currentText.includes('bonjour') && nextText.includes('ciao'));
                
            attempts++;
            
            // If we've tried too many times, just return any index
            if (attempts >= maxAttempts) {
                break;
            }
            
        } while (nextIndex === this.currentIndex);
        
        return nextIndex;
    }
    
    startAnimation() {
        setInterval(() => {
            // Add dust out effect to current elements
            if (this.textElement) {
                this.textElement.classList.add('dust-out');
                this.langElement.style.opacity = '0';
                
                // Change to next greeting after a short delay
                setTimeout(() => {
                    // Get a non-consecutive greeting
                    this.currentIndex = this.getNextGreetingIndex();
                    this.updateGreeting();
                }, 400);
            } else {
                // If no text element exists yet, just update immediately
                this.currentIndex = (this.currentIndex + 1) % this.greetings.length;
                this.updateGreeting();
            }
            
        }, 3000); // Change every 3 seconds
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GreetingAnimation();
});
