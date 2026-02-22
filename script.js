// script.js - Neo-Brutalist Interactions
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Elements
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const themeBtn = document.getElementById('theme-btn');
    const mobileLinks = mobileNav.querySelectorAll('a');

    // Themes array to cycle through
    const themes = ['coral', 'acid', 'dark','milesmorales'];
    let currentThemeIndex = 0;

    // Check LocalStorage for theme
    const savedTheme = localStorage.getItem('brutal-theme');
    if (savedTheme && themes.includes(savedTheme)) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        currentThemeIndex = themes.indexOf(savedTheme);
    }

    // Theme Toggle Handler
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // Cycle to next theme
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            const newTheme = themes[currentThemeIndex];
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('brutal-theme', newTheme);
            
            // Re-render icons after slight style shift if needed
            setTimeout(() => {
                lucide.createIcons();
            }, 50);
        });
    }

    // Mobile Menu Toggle
    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            if (isOpen) {
                mobileNav.classList.remove('open');
                mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
                body.style.overflow = '';
            } else {
                mobileNav.classList.add('open');
                mobileBtn.innerHTML = `<i data-lucide="x"></i>`;
                body.style.overflow = 'hidden'; // prevent scrolling
            }
            lucide.createIcons();
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
                body.style.overflow = '';
                lucide.createIcons();
            });
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple Intersection Observer to add a pop-in effect on cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const popInElements = document.querySelectorAll('.skill-card, .project-item, .contact-card, .social-banner, .resume-banner');
    
    // Set initial state
    popInElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    popInElements.forEach(el => {
        scrollObserver.observe(el);
    });
});
