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

// Navigation scroll handler
let lastScrollY = 0;
let ticking = false;

function updateNavigation() {
    const nav = document.querySelector('nav');
    const currentScrollY = window.scrollY;
    
    // Show nav when at top of page
    if (currentScrollY <= 0) {
        nav.classList.remove('nav-hidden');
    }
    // Hide nav when scrolling down, show when scrolling up
    else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        nav.classList.add('nav-hidden');
    } else if (currentScrollY < lastScrollY) {
        nav.classList.remove('nav-hidden');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateNavigation);
        ticking = true;
    }
}

// Add scroll event listener
window.addEventListener('scroll', requestTick);

// Optional: Add mouse move listener for top area hover
document.addEventListener('mousemove', (e) => {
    const nav = document.querySelector('nav');
    // Show nav when mouse is near top of screen (within 100px)
    if (e.clientY <= 100) {
        nav.classList.remove('nav-hidden');
    }
});

// Generic Slideshow Class
class Slideshow {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Slideshow container with id '${containerId}' not found`);
            return;
        }
        
        this.currentSlideIndex = 0;
        this.slides = this.container.querySelectorAll('.slide');
        this.indicators = this.container.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        
        // Options
        this.showCounter = options.showCounter !== false; // Default true
        this.enableKeyboard = options.enableKeyboard !== false; // Default true
        
        // Counter elements
        this.currentSlideCounter = this.container.querySelector('#current-slide, .current-slide');
        this.totalSlidesCounter = this.container.querySelector('#total-slides, .total-slides');
        
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) return;
        
        // Update total slides counter
        if (this.showCounter && this.totalSlidesCounter) {
            this.totalSlidesCounter.textContent = this.totalSlides;
        }
        
        // Show first slide
        this.showSlide(0);
        
        // Setup event listeners for this slideshow
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Find prev/next buttons with multiple possible selectors
        const prevBtn = this.container.querySelector('.prev, .slideshow-prev, [data-slide="prev"]');
        const nextBtn = this.container.querySelector('.next, .slideshow-next, [data-slide="next"]');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeSlide(-1);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changeSlide(1);
            });
        }
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
            });
        });
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }
        
        // Update counter
        if (this.showCounter && this.currentSlideCounter) {
            this.currentSlideCounter.textContent = index + 1;
        }
    }
    
    changeSlide(direction) {
        this.currentSlideIndex += direction;
        
        if (this.currentSlideIndex >= this.totalSlides) {
            this.currentSlideIndex = 0;
        } else if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = this.totalSlides - 1;
        }
        
        this.showSlide(this.currentSlideIndex);
    }
    
    goToSlide(index) {
        this.currentSlideIndex = index;
        this.showSlide(this.currentSlideIndex);
    }
}

// Universal slideshow handler for any buttons with data attributes
document.addEventListener('click', function(e) {
    // Handle prev/next buttons with data attributes
    if (e.target.hasAttribute('data-slideshow-prev')) {
        e.preventDefault();
        const slideshowId = e.target.getAttribute('data-slideshow-prev');
        const slideshow = window.slideshows && window.slideshows[slideshowId];
        if (slideshow) {
            slideshow.changeSlide(-1);
        }
    }
    
    if (e.target.hasAttribute('data-slideshow-next')) {
        e.preventDefault();
        const slideshowId = e.target.getAttribute('data-slideshow-next');
        const slideshow = window.slideshows && window.slideshows[slideshowId];
        if (slideshow) {
            slideshow.changeSlide(1);
        }
    }
    
    // Handle indicator clicks with data attributes
    if (e.target.hasAttribute('data-slideshow-goto')) {
        e.preventDefault();
        const [slideshowId, slideIndex] = e.target.getAttribute('data-slideshow-goto').split(',');
        const slideshow = window.slideshows && window.slideshows[slideshowId];
        if (slideshow) {
            slideshow.goToSlide(parseInt(slideIndex));
        }
    }
});

// Store slideshows globally for easy access
window.slideshows = {};

// Initialize slideshows when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Auto-detect and initialize all slideshows
    const slideshowContainers = document.querySelectorAll('[data-slideshow], .slideshow-container');
    
    slideshowContainers.forEach(container => {
        const id = container.id || container.getAttribute('data-slideshow');
        if (id) {
            window.slideshows[id] = new Slideshow(id, {
                showCounter: true,
                enableKeyboard: true
            });
        }
    });
    
    // Manual initialization examples (you can still do this)
    // window.slideshows['position-slideshow'] = new Slideshow('position-slideshow', {
    //     showCounter: true,
    //     enableKeyboard: true
    // });
});

// Global keyboard navigation for all slideshows
document.addEventListener('keydown', (e) => {
    // This will work for the main slideshow or you can customize per slideshow
    if (e.key === 'ArrowLeft') {
        // Find the currently focused slideshow or use the first one
        const activeSlideshow = document.querySelector('.slideshow-container:hover, .slideshow-container');
        if (activeSlideshow) {
            const event = new CustomEvent('slideshow-prev');
            activeSlideshow.dispatchEvent(event);
        }
    } else if (e.key === 'ArrowRight') {
        const activeSlideshow = document.querySelector('.slideshow-container:hover, .slideshow-container');
        if (activeSlideshow) {
            const event = new CustomEvent('slideshow-next');
            activeSlideshow.dispatchEvent(event);
        }
    }
});

// Smooth scrolling for navigation links
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

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .race-card, .driver-row');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    }
});

// Function to toggle code sections visibility
function toggleCodeSection(sectionId) {
  const codeSection = document.getElementById(sectionId);
  
  // If the section is currently hidden, show it
  if (codeSection.style.display === 'none' || codeSection.style.display === '') {
    codeSection.style.display = 'block';
    
    // Find the button that triggered this and update text
    const buttons = document.querySelectorAll('.code-btn');
    for (const button of buttons) {
      if (button.getAttribute('onclick') === `toggleCodeSection('${sectionId}')`) {
        button.textContent = 'Hide Python Code';
        break;
      }
    }
  } else {
    // If it's visible, hide it
    codeSection.style.display = 'none';
    
    // Find the button that triggered this and update text
    const buttons = document.querySelectorAll('.code-btn');
    for (const button of buttons) {
      if (button.getAttribute('onclick') === `toggleCodeSection('${sectionId}')`) {
        button.textContent = 'Show Python Code';
        break;
      }
    }
  }
}

// Function to copy code to clipboard
function copyCode(sectionId) {
  const codeSection = document.getElementById(sectionId);
  const preElement = codeSection.querySelector('pre');
  const codeText = preElement.textContent;
  
  // Create a temporary textarea element to copy the text
  const textarea = document.createElement('textarea');
  textarea.value = codeText;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  
  // Select and copy the text
  textarea.select();
  document.execCommand('copy');
  
  // Remove the temporary element
  document.body.removeChild(textarea);
  
  // Show feedback that text was copied
  const copyButton = codeSection.querySelector('.copy-btn');
  const originalText = copyButton.textContent;
  copyButton.textContent = 'Copied!';
  
  // Reset button text after a delay
  setTimeout(() => {
    copyButton.textContent = originalText;
  }, 2000);
}

// Initialize all code sections to be hidden on page load
document.addEventListener('DOMContentLoaded', function() {
  // Hide all code sections initially
  const codeSections = document.querySelectorAll('.code-section');
  codeSections.forEach(section => {
    section.style.display = 'none';
  });
  
  // Add copy functionality to all copy buttons
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Prevent the click from propagating and potentially triggering other events
      e.stopPropagation();
      
      // Get the section ID from the parent code section
      const sectionId = this.closest('.code-section').id;
      copyCode(sectionId);
    });
  });
});

let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let xOffset = 0;
let yOffset = 0;
let currentScale = 1;

function expandChart(element) {
    const img = element.querySelector('img');
    const expandedImg = document.getElementById('expandedChartImg');
    const overlay = document.getElementById('chartExpanded');
    
    // Reset transforms
    currentScale = 1;
    xOffset = 0;
    yOffset = 0;
    
    expandedImg.src = img.src;
    expandedImg.alt = img.alt;
    expandedImg.style.transform = 'translate(0px, 0px) scale(1)';
    
    updateZoomIndicator();
    overlay.classList.add('active');
    
    // Add event listeners for the expanded image
    setupImageInteraction();
}

function closeChart() {
    document.getElementById('chartExpanded').classList.remove('active');
    removeImageInteraction();
}

function setupImageInteraction() {
    const expandedImg = document.getElementById('expandedChartImg');
    const container = expandedImg.parentElement;
    
    // Mouse events for dragging
    expandedImg.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragEnd);
    
    // Touch events for mobile
    expandedImg.addEventListener('touchstart', dragStart);
    document.addEventListener('touchmove', dragMove);
    document.addEventListener('touchend', dragEnd);
    
    // Wheel event for zooming
    container.addEventListener('wheel', handleZoom);
    
    // Prevent context menu
    expandedImg.addEventListener('contextmenu', (e) => e.preventDefault());
}

function removeImageInteraction() {
    const expandedImg = document.getElementById('expandedChartImg');
    const container = expandedImg.parentElement;
    
    expandedImg.removeEventListener('mousedown', dragStart);
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    
    expandedImg.removeEventListener('touchstart', dragStart);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('touchend', dragEnd);
    
    container.removeEventListener('wheel', handleZoom);
}

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === document.getElementById('expandedChartImg')) {
        isDragging = true;
    }
}

function dragMove(e) {
    if (isDragging) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTransform();
    }
}

function dragEnd() {
    isDragging = false;
}

function handleZoom(e) {
    e.preventDefault();
    
    const zoomIntensity = 0.1;
    const wheel = e.deltaY < 0 ? 1 : -1;
    const zoom = Math.exp(wheel * zoomIntensity);
    
    // Calculate new scale
    const newScale = currentScale * zoom;
    
    // Limit zoom range
    if (newScale >= 0.5 && newScale <= 5) {
        currentScale = newScale;
        setTransform();
        updateZoomIndicator();
    }
}

function setTransform() {
    const expandedImg = document.getElementById('expandedChartImg');
    expandedImg.style.transform = `translate(${xOffset}px, ${yOffset}px) scale(${currentScale})`;
}

function updateZoomIndicator() {
    const indicator = document.getElementById('zoomIndicator');
    indicator.textContent = Math.round(currentScale * 100) + '%';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (document.getElementById('chartExpanded').classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                closeChart();
                break;
            case '0':
                // Reset zoom and position
                currentScale = 1;
                xOffset = 0;
                yOffset = 0;
                setTransform();
                updateZoomIndicator();
                break;
            case '+':
            case '=':
                // Zoom in
                if (currentScale < 5) {
                    currentScale *= 1.2;
                    setTransform();
                    updateZoomIndicator();
                }
                break;
            case '-':
                // Zoom out
                if (currentScale > 0.5) {
                    currentScale /= 1.2;
                    setTransform();
                    updateZoomIndicator();
                }
                break;
        }
    }
});

// Double-click to reset
document.getElementById('expandedChartImg').addEventListener('dblclick', function() {
    currentScale = 1;
    xOffset = 0;
    yOffset = 0;
    setTransform();
    updateZoomIndicator();
});

// Document TOC interactions
document.querySelectorAll('.toc-entry').forEach(entry => {
    entry.addEventListener('click', function() {
        const targetSection = this.querySelector('.entry-section').getAttribute('data-section');
        scrollToSection(targetSection);
    });
});

// Scroll to section function
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const floatingToc = document.getElementById('floatingToc');
    const tocHoverTrigger = document.getElementById('tocHoverTrigger');
    const tocToggle = document.getElementById('tocToggle');
    const tocItems = document.querySelectorAll('.floating-toc-item');
    const sections = document.querySelectorAll('.section, .hero');
    
    // Hover functionality for desktop
    let hoverTimeout;
    
    // Show TOC when hovering over trigger area
    tocHoverTrigger.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        floatingToc.classList.add('show');
    });
    
    // Keep TOC open when hovering over the TOC itself
    floatingToc.addEventListener('mouseenter', function() {
        clearTimeout(hoverTimeout);
        floatingToc.classList.add('show');
    });
    
    // Hide TOC when mouse leaves both trigger and TOC
    function hideToc() {
        hoverTimeout = setTimeout(() => {
            floatingToc.classList.remove('show');
        }, 300); // Small delay to prevent flickering
    }
    
    tocHoverTrigger.addEventListener('mouseleave', hideToc);
    floatingToc.addEventListener('mouseleave', hideToc);
    
    // Toggle TOC on mobile
    if (tocToggle) {
        tocToggle.addEventListener('click', function() {
            floatingToc.classList.toggle('show');
        });
    }
    
    // Close TOC when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            !floatingToc.contains(e.target) && 
            !tocToggle.contains(e.target) &&
            !tocHoverTrigger.contains(e.target)) {
            floatingToc.classList.remove('show');
        }
    });
    
    // Update active section highlighting
    function updateActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        tocItems.forEach(item => {
            item.classList.remove('active');
            const link = item.querySelector('a');
            if (link.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }
    
    // Update active section on scroll (but don't show/hide TOC)
    window.addEventListener('scroll', updateActiveSection);
    
    // Smooth scroll for floating TOC links
    document.querySelectorAll('.floating-toc-item a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile TOC after clicking
                if (window.innerWidth <= 768) {
                    floatingToc.classList.remove('show');
                }
            }
        });
    });
    
    // Initialize active section
    updateActiveSection();
});