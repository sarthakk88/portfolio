// Traditional Portfolio JavaScript - Enhanced Version with Education
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

        // Close mobile menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });

        // Project filter buttons with smooth animations
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProjectsSmooth(filter);

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    populateContent() {
        this.populateHero();
        this.populateAbout();
        this.populateSkills();
        this.populateProjects();
        this.populateExperience();
        this.populateEducation();
        this.populateContact();
        this.populateSocialLinks();
    }

    populateHero() {
        const { personal_info } = this.config;

        const heroName = document.querySelector('.hero h1');
        const heroTitle = document.querySelector('.typing-text');
        const heroBio = document.querySelector('.hero p');

        if (heroName) heroName.textContent = personal_info.name;
        if (heroTitle) heroTitle.textContent = personal_info.title;
        if (heroBio) heroBio.textContent = personal_info.bio;
    }

    populateAbout() {
        const { personal_info } = this.config;

        const aboutText = document.querySelector('#about .about-text p');
        if (aboutText) {
            aboutText.textContent = personal_info.bio;
        }

        // Add profile images
        const profileImages = document.querySelectorAll('.hero-image img, .about-image img');
        profileImages.forEach(img => {
            img.src = './assets/images/profile.jpg';
            img.onerror = function() {
                this.src = 'https://via.placeholder.com/300x300/f3f4f6/9ca3af?text=Profile+Image';
            };
        });
    }

    populateSkills() {
        const skillsContainer = document.querySelector('.skills-grid');
        if (!skillsContainer) return;

        skillsContainer.innerHTML = '';

        this.config.skills.forEach((skillCategory, index) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.style.animationDelay = `${index * 0.1}s`;

            skillCard.innerHTML = `
                <h3>${skillCategory.category}</h3>
                <div class="skill-tags">
                    ${skillCategory.technologies.map(tech => 
                        `<span class="skill-tag">${tech}</span>`
                    ).join('')}
                </div>
            `;

            skillsContainer.appendChild(skillCard);
        });
    }

    populateProjects() {
        const projectsContainer = document.querySelector('.projects-grid');
        if (!projectsContainer) return;

        projectsContainer.innerHTML = '';

        this.config.projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsContainer.appendChild(projectCard);
        });

        // Initialize with all projects visible
        this.currentFilter = 'all';
    }

    // Enhanced filter function with smooth animations
    filterProjectsSmooth(filter) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        // Add fade out effect
        projectsGrid.style.opacity = '0.5';
        projectsGrid.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // Clear and repopulate
            projectsGrid.innerHTML = '';

            this.config.projects.forEach((project, index) => {
                if (filter === 'all' || project.category === filter) {
                    const projectCard = this.createProjectCard(project, index);
                    projectsGrid.appendChild(projectCard);
                }
            });

            // Add fade in effect
            projectsGrid.style.opacity = '1';
            projectsGrid.style.transform = 'translateY(0)';

            this.currentFilter = filter;

            // Re-initialize animations for new cards
            setTimeout(() => {
                this.initScrollAnimations();
            }, 100);

        }, 200);
    }

    // Helper method to create project cards with staggered animations
    createProjectCard(project, index) {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.dataset.category = project.category;
        projectCard.style.animationDelay = `${index * 0.1}s`;

        // Fix image path - use relative path from root
        let imagePath = project.image;
        if (imagePath && !imagePath.startsWith('http') && !imagePath.startsWith('./')) {
            imagePath = './' + imagePath;
        }
        if (!imagePath || imagePath === './') {
            imagePath = 'https://via.placeholder.com/400x250/f3f4f6/9ca3af?text=Project+Image';
        }

        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${imagePath}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/400x250/f3f4f6/9ca3af?text=Project+Image'">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> Code
                    </a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>` : ''}
                </div>
            </div>
        `;

        return projectCard;
    }

    populateExperience() {
        const experienceContainer = document.querySelector('.experience-timeline');
        if (!experienceContainer) return;

        experienceContainer.innerHTML = '';

        this.config.experience.forEach((exp, index) => {
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            experienceItem.style.animationDelay = `${index * 0.2}s`;

            experienceItem.innerHTML = `
                <div class="experience-content">
                    <h3>${exp.position}</h3>
                    <h4>${exp.company}</h4>
                    <p class="experience-period">${exp.period}</p>
                    <p class="experience-description">${exp.description}</p>
                    ${exp.achievements ? `
                        <ul class="experience-achievements">
                            ${exp.achievements.map(achievement => 
                                `<li>${achievement}</li>`
                            ).join('')}
                        </ul>
                    ` : ''}
                </div>
            `;

            experienceContainer.appendChild(experienceItem);
        });
    }

    populateEducation() {
        const educationContainer = document.querySelector('.education-timeline');
        if (!educationContainer) return;

        educationContainer.innerHTML = '';

        this.config.education.forEach((edu, index) => {
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            educationItem.style.animationDelay = `${index * 0.2}s`;

            educationItem.innerHTML = `
                <div class="education-content">
                    <h3>${edu.degree}</h3>
                    <h4>${edu.field}</h4>
                    <h5>${edu.institution}</h5>
                    <p class="education-period">${edu.period}</p>
                    <p class="education-grade">${edu.grade}</p>
                    <p class="education-description">${edu.description}</p>
                </div>
            `;

            educationContainer.appendChild(educationItem);
        });
    }

    populateContact() {
        const { personal_info } = this.config;

        const contactEmail = document.querySelector('.contact-item .contact-value');
        if (contactEmail && contactEmail.tagName === 'A') {
            contactEmail.textContent = personal_info.email;
            contactEmail.href = `mailto:${personal_info.email}`;
        }
    }

    populateSocialLinks() {
        const { social_links } = this.config;

        // Footer social links
        const socialContainer = document.querySelector('.social-links');
        if (socialContainer) {
            socialContainer.innerHTML = '';

            Object.entries(social_links).forEach(([platform, url]) => {
                if (url && url !== '' && url !== '#') {
                    const link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';

                    // Map platform names to Font Awesome icons
                    const iconMap = {
                        'github': 'github',
                        'linkedin': 'linkedin',
                        'twitter': 'twitter',
                        'portfolio': 'globe'
                    };

                    const iconName = iconMap[platform] || platform;
                    link.innerHTML = `<i class="fab fa-${iconName}"></i>`;

                    socialContainer.appendChild(link);
                }
            });
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const themeIcon = document.querySelector('#theme-toggle i');

        if (document.body.classList.contains('dark-mode')) {
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll('.skill-card, .project-card, .experience-item, .education-item');
        animateElements.forEach(el => observer.observe(el));
    }

    initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;

        const text = typingText.textContent;
        typingText.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        setTimeout(typeWriter, 1000);
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }
});
