// Wait for the document to load
document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    mobileToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animated:not(.active), .slide-left:not(.active), .slide-right:not(.active), .scale-in:not(.active)');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 50) {
                element.classList.add('active');
            }
        });
    };

    // Run on load
    animateOnScroll();

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Parallax effect for hero shapes
    window.addEventListener('mousemove', function(e) {
        const shapes = document.querySelectorAll('.hero .shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach(shape => {
            const speed = shape.classList.contains('shape-1') ? 20 : 40;
            const offsetX = (x - 0.5) * speed;
            const offsetY = (y - 0.5) * speed;
            shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    });

    // Tilt effect for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const xPercent = x / cardRect.width - 0.5;
            const yPercent = y / cardRect.height - 0.5;
            
            card.style.transform = `translateY(-5px) rotateX(${yPercent * -8}deg) rotateY(${xPercent * 8}deg)`;
            card.querySelector('.feature-icon').style.transform = `translateX(${xPercent * 10}px) translateY(${yPercent * 10}px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
            card.querySelector('.feature-icon').style.transform = '';
        });
    });

    // Button hover effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});