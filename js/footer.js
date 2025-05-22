// Footer Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter form validation (if applicable)
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            // Simple email validation
            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                // Success - in a real app, you would submit to a server here
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            } else {
                // Show error
                emailInput.classList.add('error');
                setTimeout(() => {
                    emailInput.classList.remove('error');
                }, 3000);
            }
        });
    }
    
    // Social media hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}); 