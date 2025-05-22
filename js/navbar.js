// Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navbarLinks = document.querySelector('.navbar-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    // Toggle mobile menu when hamburger is clicked
    hamburger.addEventListener('click', toggleMenu);
    
    // Close mobile menu when overlay is clicked
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Toggle navbar background on scroll
    window.addEventListener('scroll', toggleNavbarBg);
    
    // Add active class to current page link
    setActivePage();
    
    // Functions
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navbarLinks.classList.toggle('active');
        
        if (menuOverlay) {
            menuOverlay.classList.toggle('active');
        }
        
        // Prevent scrolling when menu is open
        document.body.classList.toggle('menu-open');
    }
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navbarLinks.classList.remove('active');
        
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        // Re-enable scrolling
        document.body.classList.remove('menu-open');
    }
    
    function toggleNavbarBg() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    function setActivePage() {
        // Get current page path
        const currentPath = window.location.pathname;
        
        // Loop through all navigation links
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            // If link path matches current path or is index.html and we're on the home page
            if (
                linkPath === currentPath || 
                (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html'))) ||
                (currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== 'index.html')
            ) {
                // Add active class to parent li element
                link.parentElement.classList.add('active');
            } else {
                // Remove active class
                link.parentElement.classList.remove('active');
            }
        });
    }
}); 