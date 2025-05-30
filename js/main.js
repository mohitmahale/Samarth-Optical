// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize letter animation for section titles
    initSectionTitleAnimation();
    
    // Initialize all components
    initMobileMenu();
    initGalleryFilter();
    initTestimonialSlider();
    initFaqAccordion();
    initContactForm();
    initTestimonials();
    initElementAnimations();
    initCardAnimations();
    initScrollAnimations();
});

// Initialize section title letter animation
function initSectionTitleAnimation() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        
        // Create spans for each letter
        for(let i = 0; i < text.length; i++) {
            let span = document.createElement('span');
            span.className = 'title-animation';
            span.textContent = text[i];
            title.appendChild(span);
        }
    });
    
    // Add observer to animate titles when they come into view
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionHeader = entry.target.closest('.section-header');
                    if (sectionHeader) {
                        sectionHeader.classList.add('animated');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        sectionTitles.forEach(title => {
            observer.observe(title);
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    // This will be implemented when a mobile menu button is added to the HTML
    // For now, we'll leave a placeholder function
    
    // Example implementation:
    // const menuToggle = document.querySelector('.menu-toggle');
    // const navList = document.querySelector('.nav-list');
    
    // if (menuToggle && navList) {
    //     menuToggle.addEventListener('click', function() {
    //         navList.classList.toggle('active');
    //         menuToggle.classList.toggle('active');
    //     });
    // }
}

// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Testimonial Slider Functionality
function initTestimonialSlider() {
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialSlides.length && prevBtn && nextBtn) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Show a specific slide
        function showSlide(index) {
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
                slide.style.opacity = '0';
                slide.style.transform = 'translateX(20px)';
            });
            
            testimonialSlides[index].style.display = 'block';
            
            // Trigger animation after a tiny delay
            setTimeout(() => {
                testimonialSlides[index].style.opacity = '1';
                testimonialSlides[index].style.transform = 'translateX(0)';
            }, 50);
        }
        
        // Previous slide button
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            
            if (currentSlide < 0) {
                currentSlide = testimonialSlides.length - 1;
            }
            
            showSlide(currentSlide);
        });
        
        // Next slide button
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            
            showSlide(currentSlide);
        });
    }
}

// FAQ Accordion Functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle i');
            
            // Initially hide all answers
            answer.style.display = 'none';
            
            question.addEventListener('click', () => {
                // Toggle the active class
                item.classList.toggle('active');
                
                // Toggle the display of the answer
                if (answer.style.display === 'none') {
                    // Close any open answers first
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.faq-answer').style.display = 'none';
                            otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                        }
                    });
                    
                    // Open this answer
                    answer.style.display = 'block';
                    toggle.className = 'fas fa-minus';
                    
                    // Animate opening
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    
                    setTimeout(() => {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.opacity = '1';
                    }, 10);
                    
                } else {
                    // Animate closing
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    
                    // After animation completes, hide the element
                    setTimeout(() => {
                        answer.style.display = 'none';
                        toggle.className = 'fas fa-plus';
                    }, 300);
                }
            });
        });
    }
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.hasAttribute('required') && !element.value.trim()) {
                    isValid = false;
                    
                    // Add error class to parent form-group
                    element.parentElement.classList.add('error');
                    
                    // Shake animation on invalid fields
                    element.classList.add('shake');
                    setTimeout(() => {
                        element.classList.remove('shake');
                    }, 500);
                    
                    // Remove error class when user starts typing
                    element.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.parentElement.classList.remove('error');
                        }
                    });
                }
            }
            
            // If all required fields are filled
            if (isValid) {
                // Form is valid, you can submit to a server here
                // For now, we'll just display an alert
                
                // Add success animation
                contactForm.classList.add('success-submit');
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you soon.');
                    
                    // Reset form
                    contactForm.reset();
                    contactForm.classList.remove('success-submit');
                }, 500);
            } else {
                alert('Please fill all required fields.');
            }
        });
    }
}

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add animations on scroll
window.addEventListener('scroll', function() {
    // This can be expanded with more animations if needed
    const scrollPosition = window.scrollY;
    
    // Example: Fade in elements as they come into view
    document.querySelectorAll('.service-card, .frame-card, .feature, .value-card, .benefit-card, .certificate-card, .gallery-item, .machine-card, .contact-info-card').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top + scrollPosition;
        const viewportHeight = window.innerHeight;
        
        if (scrollPosition > elementPosition - viewportHeight + 100) {
            element.classList.add('fade-in');
        }
    });
});

// Back to top button
window.addEventListener('scroll', function() {
    // This could be implemented if a back-to-top button is added to the HTML
    // For now, we'll leave a placeholder
    
    // Example implementation:
    // const backToTopBtn = document.querySelector('.back-to-top');
    
    // if (backToTopBtn) {
    //     if (window.scrollY > 300) {
    //         backToTopBtn.classList.add('show');
    //     } else {
    //         backToTopBtn.classList.remove('show');
    //     }
    // }
});

// Testimonial Switching
function initTestimonials() {
    const testimonialProfiles = document.querySelectorAll('.testimonial-profile');
    const testimonialContent = document.querySelector('.testimonial-content');
    
    if (testimonialProfiles.length > 0 && testimonialContent) {
        // Set the first profile as active by default
        testimonialProfiles[0].classList.add('active');
        
        // Store the original testimonial text
        const originalContent = testimonialContent.innerHTML;
        
        // Set up click event for each profile
        testimonialProfiles.forEach(profile => {
            profile.addEventListener('click', () => {
                // Remove active class from all profiles
                testimonialProfiles.forEach(p => p.classList.remove('active'));
                
                // Add active class to the clicked profile
                profile.classList.add('active');
                
                // For a real application, you would fetch the testimonial content
                // for the specific profile and update the content
                
                // For demo purposes, we'll just show the original content
                // with a transition effect
                testimonialContent.style.opacity = '0';
                testimonialContent.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    testimonialContent.innerHTML = originalContent;
                    
                    // Fade in the content
                    setTimeout(() => {
                        testimonialContent.style.opacity = '1';
                        testimonialContent.style.transform = 'translateX(0)';
                    }, 50);
                }, 300);
            });
        });
    }
}

// Element Animations
function initElementAnimations() {
    // Add hover effects to service and frame cards
    const cards = document.querySelectorAll('.service-card, .frame-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const title = card.querySelector('.service-title, .frame-title');
            if (title) {
                title.style.color = '#ff8c42'; // Orange accent
            }
            
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const title = card.querySelector('.service-title, .frame-title');
            if (title) {
                title.style.color = '';
            }
            
            const image = card.querySelector('img');
            if (image) {
                image.style.transform = '';
            }
        });
    });
    
    // Add pulse animation to feature icons on scroll
    const features = document.querySelectorAll('.feature');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icon = entry.target.querySelector('i');
                    if (icon) {
                        icon.style.animation = 'pulse 1.5s';
                        
                        // Remove animation after it completes
                        setTimeout(() => {
                            icon.style.animation = '';
                        }, 1500);
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        features.forEach(feature => {
            observer.observe(feature);
        });
    }
}

// Add elegant card animations
function initCardAnimations() {
    const cards = document.querySelectorAll('.service-card, .frame-card, .feature, .value-card, .benefit-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            
            // Get mouse position relative to card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation values (maximum +/- 5 degrees)
            const rotateX = (((y / rect.height) * 10) - 5) * -0.5;
            const rotateY = (((x / rect.width) * 10) - 5) * 0.5;
            
            // Apply gentle transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add highlight effect
            const shineStrength = 0.1;
            this.style.background = `linear-gradient(${135 + rotateY * 10}deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, ${shineStrength}) 80%)`;
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = '';
        });
    });
}

// Add scroll animations for sections
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.hero-section, .services-section, .frames-section, .testimonials-section, .features-section');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Add staggered animation to children
                    const children = entry.target.querySelectorAll('.service-card, .frame-card, .feature');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, 100 * index);
                    });
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Add a pulse animation keyframes
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
        color: #ff8c42;
    }
    100% {
        transform: scale(1);
    }
}

@keyframes fadeIn {
    0% { 
        opacity: 0;
        transform: translateY(20px);
    }
    100% { 
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    0% { 
        opacity: 0;
        transform: translateX(-20px);
    }
    100% { 
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
}

.shake {
    animation: shake 0.5s;
}

.success-submit {
    animation: successPulse 0.5s;
}

@keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}

/* Section animations */
.hero-section:not(.animated),
.services-section:not(.animated),
.frames-section:not(.animated),
.testimonials-section:not(.animated),
.features-section:not(.animated) {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.hero-section.animated,
.services-section.animated,
.frames-section.animated,
.testimonials-section.animated,
.features-section.animated {
    opacity: 1;
    transform: translateY(0);
}

/* Card animations */
.service-card:not(.animated),
.frame-card:not(.animated),
.feature:not(.animated) {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.service-card.animated,
.frame-card.animated,
.feature.animated {
    opacity: 1;
    transform: translateY(0);
}

/* Testimonial content transitions */
.testimonial-content {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

/* FAQ animations */
.faq-answer {
    transition: opacity 0.3s, max-height 0.3s;
    overflow: hidden;
}
`;
document.head.appendChild(style);
