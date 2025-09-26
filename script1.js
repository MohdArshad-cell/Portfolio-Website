// JavaScript Start Here

// Run the main script after the HTML document is parsed
document.addEventListener('DOMContentLoaded', () => {

    // --- All Query Selectors ---
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a:not(.dropdown-toggle)');
    const darkModeIcon = document.querySelector('#darkMode-icon');
    const backToTopBtn = document.querySelector('#back-to-top');
    const contactForm = document.querySelector('#contact-form');
    const submitBtn = document.querySelector('#submit-btn');
    const header = document.querySelector('header');
    const progressBar = document.getElementById('progress-bar');
    const typedElement = document.querySelector('.multiple-text');
    const statNumbers = document.querySelectorAll('.stat-number');
    const projectSlides = document.querySelectorAll('.project-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dots = document.querySelectorAll('.dot');
    const projectsSection = document.querySelector('#projects');

    // --- Throttle Function for Performance ---
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const context = this;
            const args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // --- Consolidated Scroll Events ---
    const handleScroll = () => {
        // Back to Top Button Logic
        if (backToTopBtn) {
            window.scrollY > 300 ? backToTopBtn.classList.add('show') : backToTopBtn.classList.remove('show');
        }

        // Progress Bar Logic
        if (progressBar) {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollableHeight) * 100;
            progressBar.style.width = scrolled + '%';
        }

        // Sticky Navbar Logic
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        // Active Navigation Link on Scroll
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 150;
            if (window.scrollY >= secTop) {
                currentSectionId = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', throttle(handleScroll, 16));

    // --- Back to Top Button Click ---
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
   // --- Mobile Menu Toggle ---
    if (menuIcon) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    } 

    // --- Typed.js for Typing Animation ---
    if (typedElement) {
        new Typed('.multiple-text', {
            strings: ['Fullstack Developer', 'Java Specialist', 'Web Designer'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    // --- AOS Animation Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // --- Animated Counter ---
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateCounter(entry.target, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(counter => counterObserver.observe(counter));
    }

    // --- Particles.js Logic ---
    function loadParticles(color) {
        if (typeof particlesJS !== 'undefined') {
            particlesJS("particles-js", {
                "particles": { "number": { "value": 80 }, "color": { "value": color }, "shape": { "type": "circle" }, "opacity": { "value": 0.5 }, "size": { "value": 3 }, "line_linked": { "enable": true, "distance": 150, "color": color, "opacity": 0.4 }, "move": { "enable": true, "speed": 6 }},
                "interactivity": { "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }}},
                "retina_detect": true
            });
        }
    }
    loadParticles('#ffffff'); // Initial load

    // --- Project Slider Logic ---
    if (projectSlides.length > 0) {
        let currentSlide = 0;
        let autoSlideInterval;

        const showSlide = (n) => {
            currentSlide = (n + projectSlides.length) % projectSlides.length;
            projectSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            projectSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startAutoSlide = () => {
            stopAutoSlide();
            autoSlideInterval = setInterval(nextSlide, 5000);
        };
        const stopAutoSlide = () => clearInterval(autoSlideInterval);
        
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); stopAutoSlide(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); stopAutoSlide(); });
        dots.forEach((dot, index) => dot.addEventListener('click', () => { showSlide(index); stopAutoSlide(); }));
        
        if (projectsSection) {
            const projectsObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => entry.isIntersecting ? startAutoSlide() : stopAutoSlide());
            }, { threshold: 0.5 });
            projectsObserver.observe(projectsSection);
        }
        
        showSlide(0); // Show first slide initially
    }

    // --- Contact Form Logic ---
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.value.trim() !== '') input.classList.add('has-value');
            input.addEventListener('input', function() {
                this.value.trim() !== '' ? this.classList.add('has-value') : this.classList.remove('has-value');
            });
        });
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.classList.add('loading');
            try {
                // Replace with your actual Formspree fetch call
                await new Promise(resolve => setTimeout(resolve, 2000));
                alert('Message sent successfully!');
                contactForm.reset();
                inputs.forEach(input => input.classList.remove('has-value'));
            } catch (error) {
                alert('Error sending message. Please try again.');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });
    }

    // --- Smooth Scrolling & Accessibility ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                menuIcon.classList.remove('bx-x');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target) && menuIcon && !menuIcon.contains(e.target)) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        }
    });
});