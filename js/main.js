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

// Product Image Sliders
function initializeSlider(sliderId, prevBtnId, nextBtnId, dotsId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    let current = 0;
    
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        current = idx;
    }
    
    prevBtn.addEventListener('click', () => {
        showSlide((current - 1 + slides.length) % slides.length);
    });
    
    nextBtn.addEventListener('click', () => {
        showSlide((current + 1) % slides.length);
    });
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => showSlide(i));
    });
    
    // Optional: swipe support for mobile
    let startX = null;
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', e => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 40) prevBtn.click();
        else if (startX - endX > 40) nextBtn.click();
        startX = null;
    });
}

// Initialize all sliders
(function() {
    // Single Wall Cup Slider
    initializeSlider('singleWallSlider', 'singleWallPrev', 'singleWallNext', 'singleWallDots');
    
    // Ripple Wall Cup Slider
    initializeSlider('rippleWallSlider', 'rippleWallPrev', 'rippleWallNext', 'rippleWallDots');
    
    // Double Wall Cup Slider
    initializeSlider('doubleWallSlider', 'doubleWallPrev', 'doubleWallNext', 'doubleWallDots');
    
    // Ice Cream Cup Slider
    initializeSlider('iceCreamSlider', 'iceCreamPrev', 'iceCreamNext', 'iceCreamDots');
    
    // Paper Bowl Slider
    initializeSlider('paperBowlSlider', 'paperBowlPrev', 'paperBowlNext', 'paperBowlDots');
    
    // Salad Bowl Slider
    initializeSlider('saladBowlSlider', 'saladBowlPrev', 'saladBowlNext', 'saladBowlDots');
})();

// Product Modal Functionality
(function() {
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalFeatures = document.getElementById('modalFeatures');
    
    // Product data for modal
    const productData = {
        'single-wall': {
            title: 'Single Wall Paper Cups',
            description: 'Classic, lightweight, and cost-effective cups for hot and cold beverages. Custom print available. Color: White.',
            images: [
                'img/products/single wall1.jpg',
                'img/products/single wall2.jpg',
                'img/products/single wall3.jpg',
                'img/products/single wall4.jpg',
                'img/products/single wall5.jpg'
            ],
            specs: [
                { label: 'Sizes', value: '4 oz, 5 oz, 6 oz, 7 oz, 8/9 oz, 10 oz (Long), 10 oz, 12 oz, 16 oz, 20 oz' },
                { label: 'GSM', value: '195–320 (varies by size)' },
                { label: 'Packing', value: '1000 pcs/box' },
                { label: 'Custom Print', value: 'Yes' }
            ],
            features: [
                'Food-grade paper',
                'Eco-friendly',
                'Leak resistant',
                'Available in multiple sizes'
            ]
        },
        'ripple-wall': {
            title: 'Ripple Wall Paper Cups',
            description: 'Triple-layered for superior insulation and grip. Custom print available. Colors: Brown, Black, Chex.',
            images: [
                'img/products/ripple-wall1.jpg',
                'img/products/ripple-wall2.jpg',
                'img/products/ripple-wall3.jpg',
                'img/products/ripple-wall4.jpg',
                'img/products/ripple-wall5.jpg'
            ],
            specs: [
                { label: 'Sizes', value: '4 oz, 5 oz, 6 oz, 7 oz, 8 oz, 10 oz (Long), 10 oz, 12 oz, 16 oz, 20 oz' },
                { label: 'GSM', value: '195+240 to 320+240 (varies by size)' },
                { label: 'Packing', value: '500 pcs/box' },
                { label: 'Custom Print', value: 'Yes' },
                { label: 'Color Options', value: 'Brown, Black, Chex' }
            ],
            features: [
                'Triple wall insulation',
                'Heat resistant',
                'Premium look and feel'
            ]
        },
        'double-wall': {
            title: 'Double Wall Paper Cups',
            description: 'Double-layered for extra insulation. Custom, UV, and foiling print available. Colors: White, Craft.',
            images: [
                'img/products/double-wall-cup1.jpg',
                'img/products/double-wall-cup2.jpg',
                'img/products/double-wall-cup3.jpg',
                'img/products/double-wall-cup4.jpg',
                'img/products/double-wall-cup5.jpg'
            ],
            specs: [
                { label: 'Sizes', value: '4 oz, 7 oz, 8 oz, 10 oz (Long), 10 oz, 12 oz, 16 oz, 20 oz' },
                { label: 'GSM', value: '195+225 to 324+280 (varies by size)' },
                { label: 'Packing', value: '500 pcs/box' },
                { label: 'Custom Print', value: 'Yes (UV/Foiling)' },
                { label: 'Color Options', value: 'White, Craft' }
            ],
            features: [
                'Double wall insulation',
                'Heat resistant',
                'Premium finish'
            ]
        },
        'ice-cream': {
            title: 'Ice Cream Cups',
            description: 'Perfect for ice cream, desserts, and frozen treats. Custom print available. Colors: White, Kraft.',
            images: [
                'img/products/ice-cream-cup.jpg',
                'img/products/ice-cream-cup.jpg',
                'img/products/ice-cream-cup.jpg',
                'img/products/ice-cream-cup.jpg',
                'img/products/ice-cream-cup.jpg'
            ],
            specs: [
                { label: 'Sizes', value: '100 ml, 130 ml' },
                { label: 'GSM', value: '228' },
                { label: 'Packing', value: '1000 pcs/box' },
                { label: 'Custom Print', value: 'Yes' },
                { label: 'Color Options', value: 'White, Kraft' }
            ],
            features: [
                'Food-grade paper',
                'Eco-friendly',
                'Leak resistant'
            ]
        },
        'paper-bowl': {
            title: 'Paper Bowl & Paper Lid',
            description: 'Sturdy, leak-resistant bowls for hot and cold foods. Custom print available. Colors: White, Craft.',
            images: [
                'img/products/paper-bowl.jpg',
                'img/products/paper-bowl.jpg',
                'img/products/paper-bowl.jpg',
                'img/products/paper-bowl.jpg',
                'img/products/paper-bowl.jpg'
            ],
            specs: [
                { label: 'Sizes', value: '200 ml, 250 ml, 350 ml, 500 ml' },
                { label: 'GSM', value: '250–300 (varies by size)' },
                { label: 'Packing', value: '1000 pcs/box' },
                { label: 'Custom Print', value: 'Yes' },
                { label: 'Color Options', value: 'White, Craft' }
            ],
            features: [
                'Food-grade paper',
                'Eco-friendly',
                'Leak resistant',
                'Optional matching paper lid'
            ]
        },
        'salad-bowl': {
            title: 'Salad Bowl & Lid',
            description: 'Wide, sturdy bowls for salads, pasta, and fresh foods. Custom print available. Colors: White, Craft. PET/PP lid available.',
            images: [
                'img/products/salad-bowl.jpg',
                'img/products/salad-bowl.jpg',
                'img/products/salad-bowl.jpg',
                'img/products/salad-bowl.jpg',
                'img/products/salad-bowl.jpg'
            ],
            specs: [
                { label: 'Sizes', value: '500 ml, 750 ml, 1000 ml' },
                { label: 'GSM', value: '320' },
                { label: 'Packing', value: '300 pcs/box' },
                { label: 'Custom Print', value: 'Yes' },
                { label: 'Color Options', value: 'White, Craft' }
            ],
            features: [
                'Wide opening for easy serving',
                'Sturdy and stackable',
                'Leak resistant',
                'Optional PET/PP lid'
            ]
        }
    };
    
    // Modal slider functionality
    let modalCurrentSlide = 0;
    const modalSlides = document.querySelectorAll('.modal-slide');
    const modalDots = document.querySelectorAll('.modal-dot');
    const modalPrevBtn = document.getElementById('modalPrev');
    const modalNextBtn = document.getElementById('modalNext');
    
    function showModalSlide(idx) {
        modalSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        modalDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
        modalCurrentSlide = idx;
    }
    
    function openModal(productKey) {
        const product = productData[productKey];
        if (!product) return;
        
        // Load images into modal slider
        product.images.forEach((imageSrc, index) => {
            const modalImage = document.getElementById(`modalImage${index + 1}`);
            if (modalImage) {
                modalImage.src = imageSrc;
            }
        });
        
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        
        // Reset modal slider to first image
        showModalSlide(0);
        
        // Clear and populate specs
        modalSpecs.innerHTML = '';
        product.specs.forEach(spec => {
            const specItem = document.createElement('div');
            specItem.className = 'product-modal-spec-item';
            specItem.innerHTML = `<strong>${spec.label}:</strong> ${spec.value}`;
            modalSpecs.appendChild(specItem);
        });
        
        // Clear and populate features
        modalFeatures.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Add click handlers to product items
    document.querySelectorAll('.product-item').forEach((item, index) => {
        const productKeys = ['single-wall', 'ripple-wall', 'double-wall', 'ice-cream', 'paper-bowl', 'salad-bowl'];
        const productKey = productKeys[index];
        
        if (productKey) {
            item.addEventListener('click', () => openModal(productKey));
        }
    });
    
    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Modal slider navigation
    modalPrevBtn.addEventListener('click', () => {
        showModalSlide((modalCurrentSlide - 1 + modalSlides.length) % modalSlides.length);
    });
    
    modalNextBtn.addEventListener('click', () => {
        showModalSlide((modalCurrentSlide + 1) % modalSlides.length);
    });
    
    modalDots.forEach((dot, i) => {
        dot.addEventListener('click', () => showModalSlide(i));
    });
    
    // Modal slider touch/swipe support
    const modalSlider = document.getElementById('modalSlider');
    let modalStartX = null;
    
    modalSlider.addEventListener('touchstart', e => {
        modalStartX = e.touches[0].clientX;
    });
    
    modalSlider.addEventListener('touchend', e => {
        if (modalStartX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - modalStartX > 40) modalPrevBtn.click();
        else if (modalStartX - endX > 40) modalNextBtn.click();
        modalStartX = null;
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
})(); 