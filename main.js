document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader logic
    const preloader = document.getElementById('preloader');
    
    // Simulate loading time
    setTimeout(() => {
        if(preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 2000);
        }
    }, 1500);

    // 2. Render Products Grid
    const gridContainer = document.getElementById('products-grid');
    if (gridContainer && typeof products !== 'undefined') {
        products.forEach((product, index) => {
            const card = document.createElement('a');
            card.href = `product.html?id=${product.id}`;
            card.className = 'product-card glass-panel';
            
            // Add a staggered animation delay based on index
            card.style.animation = `fadeInDown 0.5s ease ${index * 0.02}s both`;
            
            card.innerHTML = `<span>${product.id}</span>`;
            gridContainer.appendChild(card);
        });
    }

    // 3. Audio Toggle
    const audioToggle = document.getElementById('audio-toggle');
    const crowdAudio = document.getElementById('crowd-audio');

    if (audioToggle && crowdAudio) {
        // Set initial volume low
        crowdAudio.volume = 0.3;
        
        let isPlaying = false;
        
        audioToggle.addEventListener('click', () => {
            if (isPlaying) {
                crowdAudio.pause();
                audioToggle.querySelector('.icon').textContent = '🔇';
                audioToggle.querySelector('.text').textContent = 'Sound Off';
            } else {
                // Handle autoplay browser restrictions
                const playPromise = crowdAudio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        audioToggle.querySelector('.icon').textContent = '🔊';
                        audioToggle.querySelector('.text').textContent = 'Stadium Sound';
                    }).catch(error => {
                        console.error("Audio playback prevented:", error);
                    });
                }
            }
            isPlaying = !isPlaying;
        });
    }

    // 4. Create Floating Dust Particles
    createParticles();
});

function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize properties
        const size = Math.random() * 4 + 1; // 1px to 5px
        const posX = Math.random() * 100; // 0vw to 100vw
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * 10; // 0s to 10s
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}vw`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}
