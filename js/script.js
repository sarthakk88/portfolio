// Traditional Portfolio JavaScript
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
            this.initScrollAnimations();
            this.initTypingEffect();
        } catch (error) {
            console.error('Error initializing portfolio:', error);
        }
    }

    async loadConfig() {
        try {
            const response = await fetch('./config.json');
            this.config = await response.json();
        } catch (error) {
            console.error('Error loading config:', error);
            this.config = this.getDefaultConfig();
        }
    }

    getDefaultConfig() {
        return {
            personal_info: {
                name: "Your Name",
                title: "Developer",
                email: "your.email@example.com",
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

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }

        // Mobile navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            });
        });

        // Project filters
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterProjects(e.target.dataset.filter);
            });
        });

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

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
    }

    populateContent() {
        this.populatePersonalInfo();
        this.populateSkills();
        this.populateProjects();
        this.populateExperience();
        this.populateSocialLinks();
    }

    populatePersonalInfo() {
        const { personal_info } = this.config;

        // Update text content
        this.updateElement('bio-text', personal_info.bio);
        this.updateElement('location', personal_info.location);
        this.updateElement('email', personal_info.email);
        this.updateElement('contact-email', personal_info.email);
        this.updateElement('contact-location', personal_info.location);
    }

    populateSkills() {
        const skillsGrid = document.getElementById('skills-grid');
        if (!skillsGrid) return;

        skillsGrid.innerHTML = '';

        this.config.skills.forEach(skillCategory => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'skill-category fade-in';
            categoryDiv.innerHTML = `
                <h3>${skillCategory.category}</h3>
                <div class="skill-tags">
                    ${skillCategory.technologies.map(tech => 
                        `<span class="skill-tag">${tech}</span>`
                    ).join('')}
                </div>
            `;
            skillsGrid.appendChild(categoryDiv);
        });
    }

    populateProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        this.config.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card fade-in`;
            projectCard.dataset.category = project.category;

            const githubLink = project.github ? 
                `<a href="${project.github}" target="_blank" rel="noopener" class="project-link github">
                    <i class="fab fa-github"></i> GitHub
                </a>` : '';

            const demoLink = project.demo ? 
                `<a href="${project.demo}" target="_blank" rel="noopener" class="project-link demo">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>` : '';

            projectCard.innerHTML = `
                <div class="project-image">
                    <i class="fas fa-code"></i>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="project-links">
                        ${githubLink}
                        ${demoLink}
                    </div>
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        });
    }

    populateExperience() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        timeline.innerHTML = '';

        this.config.experience.forEach(exp => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item fade-in';
            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-dot"></div>
                    <h3>${exp.position}</h3>
                    <h4>${exp.company}</h4>
                    <div class="duration">${exp.duration}</div>
                    <p>${exp.description}</p>
                </div>
            `;
            timeline.appendChild(timelineItem);
        });
    }

    populateSocialLinks() {
        const socialElements = [
            document.getElementById('social-links'),
            document.getElementById('footer-social')
        ];

        socialElements.forEach(container => {
            if (!container) return;

            container.innerHTML = '';

            Object.entries(this.config.social_links).forEach(([platform, url]) => {
                if (!url || url === '') return;

                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.className = 'social-link';

                let icon = '';
                switch (platform) {
                    case 'github':
                        icon = 'fab fa-github';
                        break;
                    case 'linkedin':
                        icon = 'fab fa-linkedin-in';
                        break;
                    case 'twitter':
                        icon = 'fab fa-twitter';
                        break;
                    default:
                        icon = 'fas fa-link';
                }

                link.innerHTML = `<i class="${icon}"></i>`;
                container.appendChild(link);
            });
        });
    }

    filterProjects(category) {
        this.currentFilter = category;
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            }
        });
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const themeToggle = document.getElementById('theme-toggle');
        const isDark = document.body.classList.contains('dark-mode');

        if (themeToggle) {
            themeToggle.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        }

        // Save theme preference
        localStorage.setItem('darkMode', isDark);
    }

    initTypingEffect() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const text = this.config.personal_info.title;
        let index = 0;
        typingElement.textContent = '';

        const typeText = () => {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        };

        setTimeout(typeText, 1000);
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        setTimeout(() => {
            const fadeElements = document.querySelectorAll('.fade-in');
            fadeElements.forEach(el => observer.observe(el));
        }, 500);
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link
        const mailtoLink = `mailto:${this.config.personal_info.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        this.showNotification('Message prepared! Your email client should open shortly.', 'success');

        // Reset form
        e.target.reset();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : '#3B82F6'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    updateElement(id, content) {
        const element = document.getElementById(id);
        if (element && content) {
            element.textContent = content;
        }
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Initialize portfolio
    new Portfolio();
});