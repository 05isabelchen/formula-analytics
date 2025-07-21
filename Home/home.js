function scrollDrivers(direction) {
            const container = document.getElementById('driversScroll');
            const scrollAmount = 320; // Width of one card plus gap
            
            if (direction === 'left') {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        }

        function scrollTeams(direction) {
    const container = document.getElementById('teamsScroll');
    const scrollAmount = 320; // Width of one card plus gap
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

        // Auto-hide scroll indicators on mobile
        function checkScrollIndicators() {
            const container = document.getElementById('driversScroll');
            const leftIndicator = document.querySelector('.scroll-left');
            const rightIndicator = document.querySelector('.scroll-right');
            
            if (window.innerWidth <= 768) {
                leftIndicator.style.display = 'none';
                rightIndicator.style.display = 'none';
            } else {
                leftIndicator.style.display = 'flex';
                rightIndicator.style.display = 'flex';
            }
        }

        window.addEventListener('resize', checkScrollIndicators);
        checkScrollIndicators();
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });

        // Speed counter animation
        function animateSpeed() {
            const speedElement = document.querySelector('.speed-text');
            let currentSpeed = 0;
            const targetSpeed = 320;
            const increment = targetSpeed / 100;
            
            const timer = setInterval(() => {
                currentSpeed += increment;
                if (currentSpeed >= targetSpeed) {
                    currentSpeed = targetSpeed;
                    clearInterval(timer);
                }
                speedElement.textContent = Math.floor(currentSpeed);
            }, 20);
        }

        // Trigger speed animation when page loads
        window.addEventListener('load', () => {
            setTimeout(animateSpeed, 1000);
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe stat cards and news cards
        document.querySelectorAll('.stat-card, .news-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });

        // Championship navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to championship cards
    const championshipCards = document.querySelectorAll('.news-card[data-championship-year]');
    
    championshipCards.forEach(card => {
        const year = card.getAttribute('data-championship-year');
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Navigate to the championship page based on year
            window.location.href = `${year}-championship.html`;
        });

        // Add keyboard navigation support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });

        // Make cards focusable for accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Explore ${year} Championship`);
    });
});