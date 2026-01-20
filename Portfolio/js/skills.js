// Skills Banner and Category Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsTrack = document.querySelector('.skills-track');
    
    // Clone skill items for infinite scroll effect
    if (skillsTrack) {
        const firstHalf = Array.from(skillItems).slice(0, skillItems.length / 2);
        firstHalf.forEach(item => {
            const clone = item.cloneNode(true);
            skillsTrack.appendChild(clone);
        });
    }

    // Add click event to category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skills based on category
            skillItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // If not 'all', pause animation
            if (category !== 'all') {
                skillsTrack.style.animationPlayState = 'paused';
            } else {
                skillsTrack.style.animationPlayState = 'running';
            }
        });
    });
    
    // Pause animation on hover for better interaction
    if (skillsTrack) {
        skillsTrack.addEventListener('mouseenter', () => {
            skillsTrack.style.animationPlayState = 'paused';
        });
        
        skillsTrack.addEventListener('mouseleave', () => {
            const activeBtn = document.querySelector('.category-btn.active');
            if (activeBtn && activeBtn.getAttribute('data-category') === 'all') {
                skillsTrack.style.animationPlayState = 'running';
            }
        });
    }
    
    // Add click effect on skill items
    skillItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'translateY(-5px)';
            }, 200);
        });
    });
    
    // Initialize with 'all' skills shown
    const allBtn = document.querySelector('[data-category="all"]');
    if (allBtn) allBtn.click();
});
