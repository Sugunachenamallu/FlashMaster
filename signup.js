document.addEventListener('DOMContentLoaded', function() {
            const starsContainer = document.getElementById('stars');
            const numStars = 150;

            for (let i = 0; i < numStars; i++) {
                let star = document.createElement('div');
                star.className = 'star';
                let size = Math.random() * 3; 
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 3}s`;
                star.style.animationDuration = `${2 + Math.random() * 2}s`;
                starsContainer.appendChild(star);
        }
});