// Modern Portfolio JavaScript
class Portfolio {
    constructor() {
        this.config = null;
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        try {
            await this.loadConfig();
            this.setupEventListeners();
            this.populateContent();
            this.hideLoadingScreen();
            this.initAnimations();
        } catch (error) {
            console.error('Error initializing portfolio:', error);
            this.hideLoadingScreen();
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('./config.json');
            this.config = await response.json();
        } catch (error) {
            console.error('Error loading config:', error);
            // Fallback to default config if needed
            this.config = this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            personal_info: {
                name: "Your Name",
                title: "Developer",
                email: "your.email@example.com",
                phone: "+1 (555) 123-4567",
                location: "City, Country",
                bio: "Passionate developer with expertise in modern technologies."
            },
            social_links: {
                github: "#",
                linkedin: "#",
                twitter: "#"
            },
            skills: [],
            projects: [],
            experience: [],
            education: []
        };
    }

    populateContent() {
        this.populateHero();
        this.populateAbout();
        this.populateSkills();
        this.populateProjects();
        this.populateExperience();
        this.populateContact();
        this.populateFooter();
        this.populateSocialLinks();
    }

    populateHero() {
        const { personal_info } = this.config;

        // Update navigation name
        this.updateElement('nav-name', personal_info.name);

        // Update hero content
        this.updateElement('hero-name', personal_info.name);
        this.updateElement('hero-title', personal_info.title);
        this.updateElement('hero-bio', personal_info.bio);

        // Update page title
        document.title = `${personal_info.name} - ${personal_info.title}`;
    }

    populateAbout() {
        const { personal_info, education } = this.config;

        this.updateElement('about-bio', personal_info.bio);

        // Remove resume link if not provided
        const resumeLink = document.getElementById('resume-link');
        if (resumeLink && !personal_info.resume_url) {
            resumeLink.style.display = 'none';
        } else if (resumeLink && personal_info.resume_url) {
            resumeLink.href = personal_info.resume_url;
        }
    }

    populateSkills() {
        const skillsContainer = document.getElementById('skills-container');
        if (!skillsContainer) return;

        const { skills } = this.config;

        skillsContainer.innerHTML = skills.map(skillCategory => `
            <div class="skill-category">
                <h3>${skillCategory.category}</h3>
                <div class="skill-tags">
                    ${skillCategory.technologies.map(tech => `
                        <span class="skill-tag">${tech}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    populateProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        const { projects } = this.config;

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    ${project.featured ? '<div class="featured-badge">Featured</div>' : ''}
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-github"></i> Code
                        </a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>` : ''}
                        ${!project.github && !project.demo ? '<span class="project-link disabled">Private Project</span>' : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Add featured badge styles
        const style = document.createElement('style');
        style.textContent = `
            .featured-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: var(--accent-color);
                color: white;
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.75rem;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }

    populateExperience() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        const { experience } = this.config;

        timeline.innerHTML = experience.map(exp => `
            <div class="timeline-item">
                <div class="timeline-header">
                    <div class="timeline-company">${exp.company}</div>
                    <div class="timeline-position">${exp.position}</div>
                    <div class="timeline-duration">${exp.duration}</div>
                </div>
                <p>${exp.description}</p>
            </div>
        `).join('');
    }

    populateContact() {
        const { personal_info } = this.config;

        this.updateElement('contact-email', personal_info.email);
        this.updateElement('contact-phone', personal_info.phone);
        this.updateElement('contact-location', personal_info.location);
    }

    populateFooter() {
        const { personal_info } = this.config;
        this.updateElement('footer-name', personal_info.name);
    }

    populateSocialLinks() {
        const { social_links } = this.config;

        const socialContainers = ['social-links', 'footer-social'];

        socialContainers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (!container) return;

            container.innerHTML = Object.entries(social_links)
                .filter(([platform, url]) => url && url !== '')
                .map(([platform, url]) => {
                    const iconMap = {
                        github: 'fab fa-github',
                        linkedin: 'fab fa-linkedin',
                        twitter: 'fab fa-twitter',
                        portfolio: 'fas fa-globe'
                    };

                    return `<a href="${url}" class="social-link" target="_blank" rel="noopener noreferrer" title="${platform}">
                        <i class="${iconMap[platform] || 'fas fa-link'}"></i>
                    </a>`;
                }).join('');
        });
    }

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }

    setupEventListeners() {
        // Navigation toggle
        this.setupNavigation();

        // Theme toggle
        this.setupThemeToggle();

        // Project filters
        this.setupProjectFilters();

        // Contact form
        this.setupContactForm();

        // Back to top button
        this.setupBackToTop();

        // Smooth scrolling
        this.setupSmoothScrolling();

        // Navbar scroll effect
        this.setupNavbarScrollEffect();
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        // Check for saved theme preference or default to 'light' mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (themeToggle) {
            // Update icon based on current theme
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }

            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);

                // Update icon
                if (icon) {
                    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                }
            });
        }
    }

    setupProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });

                this.currentFilter = filter;
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');

                // Create mailto link
                const mailtoLink = `mailto:${this.config.personal_info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

                window.location.href = mailtoLink;

                // Show success message
                this.showNotification('Email client opened! Please send the email to complete your message.', 'success');

                // Reset form
                contactForm.reset();
            });
        }
    }

    setupBackToTop() {
        const backToTop = document.getElementById('back-to-top');

        if (backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTop.classList.add('show');
                } else {
                    backToTop.classList.remove('show');
                }
            });

            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupSmoothScrolling() {
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
    }

    setupNavbarScrollEffect() {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (navbar) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }

                // Add background on scroll
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    initAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            zIndex: '10000',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease-out'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Add CSS animations
const animationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(20px);
    }

    [data-theme="dark"] .scrolled {
        background: rgba(17, 24, 39, 0.95) !important;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Handle errors globally
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});