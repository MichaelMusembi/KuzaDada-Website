// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('show');
            
            // Toggle menu button animation
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Add the show class for styling in CSS
    if (nav) {
        // Add show class to nav ul in CSS file
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                nav ul.show {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: var(--bg-white);
                    box-shadow: var(--shadow);
                    padding: 1rem 0;
                    z-index: 999;
                }
                
                nav ul.show li {
                    margin: 0.5rem 0;
                    width: 100%;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (testimonialSlider && testimonialCards.length > 0 && dots.length > 0) {
        // Set initial positions
        testimonialCards.forEach((card, index) => {
            card.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
        });

        // Function to change slide
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            
            testimonialCards.forEach((card, index) => {
                card.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
                card.style.transition = 'transform 0.5s ease';
            });
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Dot click event
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Auto-play slider (optional)
        let sliderInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            goToSlide(currentSlide);
        }, 5000);

        // Pause auto-play on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(sliderInterval);
        });

        // Resume auto-play on mouse leave
        testimonialSlider.addEventListener('mouseleave', () => {
            sliderInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonialCards.length;
                goToSlide(currentSlide);
            }, 5000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (nav.classList.contains('show')) {
                    mobileMenuBtn.click();
                }
                
                // Scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation & Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (name.value.trim() === '') {
                highlightError(name);
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '' || !isValidEmail(email.value)) {
                highlightError(email);
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (subject.value === '' || subject.value === null) {
                highlightError(subject);
                isValid = false;
            } else {
                removeError(subject);
            }
            
            if (message.value.trim() === '') {
                highlightError(message);
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Show success message (in a real application, you would submit the form to a server)
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.textContent = 'Your message has been sent successfully!';
                successMessage.style.color = 'var(--success-color)';
                successMessage.style.padding = '10px';
                successMessage.style.marginTop = '10px';
                successMessage.style.borderRadius = '5px';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                successMessage.style.textAlign = 'center';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Helper functions for form validation
    function highlightError(element) {
        element.style.borderColor = 'red';
        
        // Add error message if it doesn't exist
        if (!element.nextElementSibling || !element.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = `Please enter a valid ${element.placeholder.toLowerCase()}`;
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            
            element.parentNode.insertBefore(errorMessage, element.nextSibling);
        }
    }
    
    function removeError(element) {
        element.style.borderColor = '';
        
        // Remove error message if it exists
        const nextSibling = element.nextElementSibling;
        if (nextSibling && nextSibling.classList.contains('error-message')) {
            nextSibling.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Animation for program cards on scroll
    const programCards = document.querySelectorAll('.program-card');
    const resourceItems = document.querySelectorAll('.resource-item');
    
    if (programCards.length > 0 || resourceItems.length > 0) {
        // Create observer for animation on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Add animation class and styling
        const style = document.createElement('style');
        style.textContent = `
            .program-card, .resource-item {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .program-card.animate, .resource-item.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .program-card:nth-child(2), .resource-item:nth-child(2) {
                transition-delay: 0.2s;
            }
            
            .program-card:nth-child(3), .resource-item:nth-child(3) {
                transition-delay: 0.4s;
            }
            
            .resource-item:nth-child(4) {
                transition-delay: 0.6s;
            }
        `;
        document.head.appendChild(style);
        
        // Observe program cards
        programCards.forEach(card => {
            observer.observe(card);
        });
        
        // Observe resource items
        resourceItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Add sticky header style
        const style = document.createElement('style');
        style.textContent = `
            header.sticky {
                padding: 0.5rem 0;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transition: padding 0.3s ease;
            }
            
            header.sticky .logo h1 {
                font-size: 1.8rem;
                transition: font-size 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}); 