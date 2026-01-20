// Video Lazy Loading - NO AUTOPLAY (Hover to Play Only)
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('.project-video');
    
    if (!videos.length) return;
    
    // AGGRESSIVE AUTOPLAY PREVENTION
    videos.forEach(video => {
        // Stop any playing videos immediately
        video.pause();
        
        // Remove and disable autoplay in every way possible
        video.removeAttribute('autoplay');
        video.autoplay = false;
        
        // Prevent default play behavior
        video.addEventListener('play', function(e) {
            if (!this.dataset.userInitiated) {
                e.preventDefault();
                this.pause();
            }
        });
    });
    
    // Track loaded videos for memory management
    const loadedVideos = new Set();
    const UNLOAD_DISTANCE = 1500;
    
    // Intersection Observer - only for loading, NOT playing
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                // Load video when visible (but don't play)
                loadVideo(video);
            } else {
                // Pause and potentially unload when not visible
                video.pause();
                video.dataset.userInitiated = '';
                
                if (loadedVideos.has(video)) {
                    const rect = video.getBoundingClientRect();
                    const distanceFromViewport = Math.min(
                        Math.abs(rect.top - window.innerHeight),
                        Math.abs(rect.bottom)
                    );
                    
                    if (distanceFromViewport > UNLOAD_DISTANCE) {
                        unloadVideo(video);
                    }
                }
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '100px'
    });
    
    // Load video (NO PLAY)
    function loadVideo(video) {
        if (loadedVideos.has(video)) return;
        
        const loadFn = () => {
            if (!video.src && video.querySelector('source')) {
                const source = video.querySelector('source');
                video.src = source.src;
            }
            
            video.load();
            loadedVideos.add(video);
            
            video.addEventListener('error', () => {
                console.warn('Video failed to load:', video.src);
                video.style.display = 'none';
            }, { once: true });
        };
        
        if ('requestIdleCallback' in window) {
            requestIdleCallback(loadFn, { timeout: 2000 });
        } else {
            setTimeout(loadFn, 100);
        }
    }
    
    // Unload video to free memory
    function unloadVideo(video) {
        video.pause();
        video.dataset.userInitiated = '';
        video.removeAttribute('src');
        video.load();
        loadedVideos.delete(video);
    }
    
    // Setup each video
    videos.forEach(video => {
        video.setAttribute('preload', 'none');
        video.removeAttribute('autoplay');
        video.autoplay = false;
        
        // ONLY play on hover
        video.addEventListener('mouseenter', () => {
            if (video.readyState >= 2) {
                video.dataset.userInitiated = 'true';
                video.play().catch(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                });
            }
        });
        
        // Pause when mouse leaves
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.dataset.userInitiated = '';
        });
        
        videoObserver.observe(video);
    });
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
        videos.forEach(video => {
            video.pause();
            video.removeAttribute('src');
        });
    });
});


