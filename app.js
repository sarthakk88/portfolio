// Portfolio Website JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Dark mode state - stored in session variable only
    let isDarkMode = false;

    // Initialize theme on page load
    initializeTheme();

    // Mobile navigation toggle
    initializeMobileNav();

    // Typewriter effect
    initializeTypewriter();

    // Project filtering - FIXED VERSION
    initializeProjectFilter();

    // Back to top button
    initializeBackToTop();

    // Smooth scrolling for navigation links
    initializeSmoothScroll();

    /**
     * Initialize theme based on user preference
     */
    function initializeTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            isDarkMode = true;
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            isDarkMode = false;
            document.documentElement.setAttribute('data-color-scheme', 'light');
            if (themeIcon) themeIcon.textContent = '🌙';
        }

        // Theme toggle functionality
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                isDarkMode = !isDarkMode;
                if (isDarkMode) {
                    document.documentElement.setAttribute('data-color-scheme', 'dark');
                    if (themeIcon) themeIcon.textContent = '☀️';
                } else {
                    document.documentElement.setAttribute('data-color-scheme', 'light');
                    if (themeIcon) themeIcon.textContent = '🌙';
                }
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
                if (!isDarkMode && e.matches) {
                    isDarkMode = true;
                    document.documentElement.setAttribute('data-color-scheme', 'dark');
                    if (themeIcon) themeIcon.textContent = '☀️';
                } else if (isDarkMode && !e.matches) {
                    isDarkMode = false;
                    document.documentElement.setAttribute('data-color-scheme', 'light');
                    if (themeIcon) themeIcon.textContent = '🌙';
                }
            });
        }
    }

    /**
     * Initialize mobile navigation toggle
     */
    function initializeMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on a nav link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    /**
     * Initialize typewriter effect for hero section
     */
    function initializeTypewriter() {
        const typewriterElement = document.querySelector('.typewriter');
        if (!typewriterElement) return;

        const roles = typewriterElement.getAttribute('data-roles').split(',');
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        function typeWriter() {
            const currentRole = roles[currentRoleIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
            if (!isDeleting && currentCharIndex === currentRole.length) {
                typeSpeed = pauseTime;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Start the typewriter effect
        setTimeout(typeWriter, 1000);
    }

    /**
     * Initialize project filtering - FIXED VERSION
     */
    function initializeProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectsContainer = document.querySelector('.projects-grid');

        if (!filterButtons.length || !projectsContainer) return;

        // Store original projects for restoration
        const originalProjects = Array.from(document.querySelectorAll('.project-card')).map(card => ({
            element: card,
            category: card.getAttribute('data-category')
        }));

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Fade out current projects
                const currentProjects = document.querySelectorAll('.project-card');
                currentProjects.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                });

                // After fade out animation completes, filter and reposition
                setTimeout(() => {
                    // Clear the container
                    projectsContainer.innerHTML = '';

                    // Filter and add matching projects
                    const filteredProjects = originalProjects.filter(project => 
                        filter === 'all' || project.category === filter
                    );

                    filteredProjects.forEach(project => {
                        // Clone the original element to avoid moving it
                        const clonedElement = project.element.cloneNode(true);

                        // Reset styles for animation
                        clonedElement.style.opacity = '0';
                        clonedElement.style.transform = 'translateY(20px)';
                        clonedElement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

                        projectsContainer.appendChild(clonedElement);
                    });

                    // Animate in the filtered projects with stagger
                    const newProjects = document.querySelectorAll('.project-card');
                    newProjects.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });

                }, 300);
            });
        });
    }

    /**
     * Initialize back to top button
     */
    function initializeBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        if (!backToTopButton) return;

        // Show/hide button based on scroll position
        function toggleBackToTop() {
            if (window.pageYOffset > 600) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }

        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Initial check and scroll listener
        toggleBackToTop();
        window.addEventListener('scroll', debounce(toggleBackToTop, 100));
    }

    /**
     * Initialize smooth scrolling for navigation links
     */
    function initializeSmoothScroll() {
        // Get all links that point to sections on the same page
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#" or empty
                if (href === '#' || href === '') {
                    e.preventDefault();
                    return;
                }

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();

                    // Calculate offset for fixed navbar
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20; // Extra padding

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Form validation and enhancement
     */
    function initializeContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Basic client-side validation
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');

                const nameValue = name ? name.value.trim() : '';
                const emailValue = email ? email.value.trim() : '';
                const messageValue = message ? message.value.trim() : '';

                if (!nameValue || !emailValue || !messageValue) {
                    e.preventDefault();
                    alert('Please fill in all required fields.');
                    return;
                }

                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailValue)) {
                    e.preventDefault();
                    alert('Please enter a valid email address.');
                    return;
                }

                // If validation passes, the form will submit naturally
                // The mailto: action will open the user's email client
            });
        }
    }

    // Initialize contact form
    initializeContactForm();

    /**
     * Add keyboard navigation support
     */
    function initializeKeyboardNavigation() {
        // Allow Enter key to activate buttons
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && (e.target.classList.contains('filter-btn') || e.target.classList.contains('btn'))) {
                e.preventDefault();
                e.target.click();
            }
        });

        // Escape key to close mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const navToggle = document.querySelector('.nav-toggle');
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    }

    // Initialize keyboard navigation
    initializeKeyboardNavigation();

    /**
     * Intersection Observer for animation triggers
     */
    function initializeScrollAnimations() {
        // Only add animations if user hasn't requested reduced motion
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.skill-item');
        animateElements.forEach(el => {
            // Only apply initial animation styles if not already styled
            if (!el.style.opacity) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
            observer.observe(el);
        });
    }

    // Initialize scroll animations
    initializeScrollAnimations();

    /**
     * Initialize navbar background opacity on scroll
     */
    function initializeNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        function updateNavbar() {
            if (window.pageYOffset > 50) {
                navbar.style.background = 'rgba(var(--color-surface), 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = 'rgba(var(--color-surface), 0.8)';
                navbar.style.backdropFilter = 'blur(5px)';
            }
        }

        window.addEventListener('scroll', debounce(updateNavbar, 50));
        updateNavbar(); // Initial call
    }

    // Initialize navbar scroll effect
    initializeNavbarScroll();

    /**
     * Performance optimization: Debounce scroll events
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Log successful initialization
    console.log('Portfolio website initialized successfully!');
});