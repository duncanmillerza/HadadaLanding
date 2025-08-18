document.addEventListener('DOMContentLoaded', function() {
    
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


    // Intersection Observer for feature cards animation
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

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Parallax effect for floating cards
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.card').forEach((card, index) => {
            const speed = 0.5 + (index * 0.1);
            card.style.transform = `translateY(${rate * speed}px)`;
        });
        
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Dynamic background color change on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.002;
        
        // Change header opacity based on scroll
        const header = document.querySelector('.header');
        if (scrolled > 50) {
            header.style.background = 'rgba(248, 250, 251, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(248, 250, 251, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Typewriter effect for hero title (alternative animation)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Interactive hover effects for feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA button pulse animation
    function pulseButton(button) {
        button.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            button.style.animation = '';
        }, 600);
    }

    // Add pulse animation to CTA buttons on hover
    document.querySelectorAll('.cta-primary, .cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => pulseButton(button));
    });

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .feature-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card:hover .material-icons {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
        
        .card:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .floating-cards .card:nth-child(2) {
            animation-delay: 1s;
        }
        
        .floating-cards .card:nth-child(3) {
            animation-delay: 1.5s;
        }
    `;
    document.head.appendChild(style);

    // Add stagger animation to feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Mobile menu functionality
    function initMobileMenu() {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');
        let menuButton = document.querySelector('.mobile-menu-button');
        
        // Create mobile menu button if it doesn't exist
        if (!menuButton) {
            menuButton = document.createElement('button');
            menuButton.classList.add('mobile-menu-button');
            menuButton.innerHTML = '<span class="material-icons">menu</span>';
            nav.appendChild(menuButton);
            
            // Add click event to toggle menu
            menuButton.addEventListener('click', () => {
                navLinks.classList.toggle('mobile-open');
                menuButton.classList.toggle('active');
                const icon = menuButton.querySelector('.material-icons');
                icon.textContent = navLinks.classList.contains('mobile-open') ? 'close' : 'menu';
            });
        }
        
        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                menuButton.classList.remove('active');
                const icon = menuButton.querySelector('.material-icons');
                icon.textContent = 'menu';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                menuButton.classList.remove('active');
                const icon = menuButton.querySelector('.material-icons');
                icon.textContent = 'menu';
            }
        });
    }

    // Initialize mobile menu
    initMobileMenu();

    // Modal functionality
    function initModal() {
        const modal = document.getElementById('contactModal');
        const openButtons = document.querySelectorAll('.cta-primary, .cta-button');
        const closeButton = document.querySelector('.modal-close');
        const cancelButton = document.querySelector('.modal-cancel');
        const form = document.getElementById('contactForm');

        // Open modal
        openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal function
        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            form.reset();
        }

        // Close modal events
        closeButton.addEventListener('click', closeModal);
        cancelButton.addEventListener('click', closeModal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            try {
                // Submit form to Formspree
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success message
                    alert('Thank you for joining our early access program! We\'ll be in touch soon.');
                    closeModal();
                } else {
                    // Error message
                    alert('Sorry, there was an error submitting your form. Please try again or contact us directly.');
                }
            } catch (error) {
                alert('Sorry, there was an error submitting your form. Please try again or contact us directly.');
            } finally {
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Initialize modal
    initModal();

    // Loading animation complete
    document.body.classList.add('loaded');
    
    // Add loaded class to enable animations
    setTimeout(() => {
        document.body.classList.add('animations-ready');
    }, 500);
});