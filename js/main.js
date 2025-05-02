/*
GlobalTrade - Import/Export Company Website
Main JavaScript File
*/

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Slider Functionality
    const heroSlides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    
    function nextSlide() {
        // Remove active class from current slide
        heroSlides[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = (currentSlide + 1) % heroSlides.length;
        
        // Add active class to new current slide
        heroSlides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    if (heroSlides.length > 0) {
        setInterval(nextSlide, 5000);
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (nav.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
            nav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== "#") {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Account for fixed header
                        behavior: 'smooth'
                    });
                    
                    // If mobile menu is open, close it
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // FAQ Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                // Toggle current FAQ item
                const answer = this.nextElementSibling;
                const icon = this.querySelector('.faq-toggle i');
                
                // Toggle display
                if (answer.style.display === 'block') {
                    answer.style.display = 'none';
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                } else {
                    answer.style.display = 'block';
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            });
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Please enter your name.\n';
            }
            
            if (email === '') {
                isValid = false;
                errorMessage += 'Please enter your email address.\n';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.\n';
            }
            
            if (subject === '') {
                isValid = false;
                errorMessage += 'Please enter a subject.\n';
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += 'Please enter your message.\n';
            }
            
            if (!isValid) {
                alert('Please correct the following errors:\n' + errorMessage);
            } else {
                // In a real implementation, you would submit the form data to a server here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Create image directory structure
    // Note: This is just for demonstration purposes. In a real implementation,
    // you would need to actually create these directories and add the images.
    console.log('GlobalTrade website loaded successfully!');
});

// Add sticky header effect on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
}); 