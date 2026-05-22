// Modern Moving Company Website - JavaScript
// Based on Industry Best Practices

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.getElementById('mobileToggle').classList.remove('active');
            }
        }
    });
});

// ========================================
// Sticky Navigation
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// Active Navigation Link
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Form Tabs Functionality
// ========================================
const formTabs = document.querySelectorAll('.form-tab');
const formPanels = document.querySelectorAll('.form-panel');

formTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');

        // Remove active class from all tabs and panels
        formTabs.forEach(t => t.classList.remove('active'));
        formPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========================================
// Floating CTA - REMOVED (chatbot occupies this space)
// ========================================
// Floating CTA removed - chatbot widget will occupy bottom-right corner

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation - DISABLED to fix visibility issues
// Elements will show immediately without animation
document.addEventListener('DOMContentLoaded', () => {
    // Animation disabled - all elements visible by default
    console.log('Animations disabled - all content visible');
});

// ========================================
// Iframe Auto Height
// ========================================
function adjustIframeHeight() {
    const iframes = document.querySelectorAll('.iframe-wrapper iframe');

    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc) {
                    const height = iframeDoc.body.scrollHeight;
                    if (height > 0) {
                        iframe.style.height = height + 'px';
                    }
                }
            } catch (e) {
                // Cross-origin restriction - use default height
                console.log('Using default iframe height due to cross-origin policy');
            }
        });
    });
}

window.addEventListener('load', adjustIframeHeight);

// ========================================
// Phone Click Tracking
// ========================================
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
        const phoneNumber = this.getAttribute('href').replace('tel:', '');
        console.log('Phone call initiated:', phoneNumber);

        // Analytics tracking (if you have Google Analytics or similar)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'phone_call', {
                'event_category': 'Contact',
                'event_label': phoneNumber,
                'value': 1
            });
        }

        // Facebook Pixel tracking (if you have Facebook Pixel)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {
                content_name: 'Phone Call',
                content_category: 'Contact'
            });
        }
    });
});

// ========================================
// Quote Button Tracking
// ========================================
document.querySelectorAll('a[href="#quote"], .btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Quote button clicked');

        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'quote_request_initiated', {
                'event_category': 'Lead Generation',
                'event_label': 'Quote Button Click'
            });
        }
    });
});

// ========================================
// Form Embed Message Listener
// ========================================
window.addEventListener('message', function(event) {
    // Listen for messages from embedded forms
    if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'form_submitted' || event.data.formSubmitted) {
            console.log('Form submitted successfully');

            // Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Quote Form Submission'
                });
            }

            // Facebook Pixel tracking
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead', {
                    content_name: 'Quote Form',
                    content_category: 'Lead Generation'
                });
            }
        }

        // Handle iframe height messages
        if (event.data.frameHeight) {
            const iframe = document.querySelector(`iframe[id="${event.data.frameId}"]`);
            if (iframe) {
                iframe.style.height = event.data.frameHeight + 'px';
            }
        }
    }
});

// ========================================
// Lazy Loading Images
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Stats Counter Animation
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Stats animation disabled to preserve formatting (decimals, symbols, etc.)
// Elements display their original values immediately
document.querySelectorAll('.stat-number').forEach(stat => {
    // Keep original formatting - no animation
    console.log('Stat preserved:', stat.textContent);
});

// ========================================
// Scroll Progress Indicator
// ========================================
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = (window.scrollY / documentHeight) * 100;

    // You can add a progress bar element if desired
    // document.getElementById('scrollProgress').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ========================================
// Prevent Form Double Submission
// ========================================
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton && !submitButton.disabled) {
            submitButton.disabled = true;
            setTimeout(() => {
                submitButton.disabled = false;
            }, 3000);
        }
    });
});

// ========================================
// Service Card Interaction
// ========================================
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        // Add pulse animation on click
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ========================================
// Gallery Lightbox Effect
// ========================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // You can add a lightbox/modal here if desired
        console.log('Gallery item clicked');
    });
});

// ========================================
// Mobile Viewport Height Fix
// ========================================
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

// ========================================
// Testimonial Auto Rotation (Optional)
// ========================================
let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const autoRotate = false; // Set to true to enable auto-rotation

if (autoRotate && testimonialCards.length > 3) {
    setInterval(() => {
        testimonialCards.forEach(card => card.style.opacity = '0.5');
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
        testimonialCards[testimonialIndex].style.opacity = '1';
    }, 5000);
}

// ========================================
// Performance Monitoring
// ========================================
window.addEventListener('load', () => {
    // Log page load performance
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);

        // You can send this to analytics
        if (typeof gtag !== 'undefined' && pageLoadTime > 0) {
            gtag('event', 'timing_complete', {
                name: 'page_load',
                value: pageLoadTime,
                event_category: 'Performance'
            });
        }
    }
});

// ========================================
// Initialize Everything
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('RD Moving website initialized');

    // Set initial active states
    updateActiveLink();

    // Log successful initialization
    console.log('✓ Navigation initialized');
    console.log('✓ Form tabs initialized');
    console.log('✓ Animations initialized');
    console.log('✓ Tracking initialized');
});

// ========================================
// Error Handling
// ========================================
window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);

    // You can send errors to monitoring service
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: event.error.message,
            fatal: false
        });
    }
});

// ========================================
// Accessibility Enhancements
// ========================================
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Focus trap for mobile menu
const focusableElements = 'a[href], button, textarea, input, select';
const modal = document.getElementById('navMenu');

if (modal) {
    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;

        const isTabPressed = e.key === 'Tab';
        if (!isTabPressed) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
}
