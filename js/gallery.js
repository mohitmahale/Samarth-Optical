document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Fullscreen view functionality
    const modal = document.querySelector('.fullscreen-modal');
    const modalImg = modal.querySelector('img');
    const modalCaption = modal.querySelector('.modal-caption');
    const closeBtn = modal.querySelector('.close-modal');
    const prevBtn = modal.querySelector('.prev-image');
    const nextBtn = modal.querySelector('.next-image');
    
    let currentIndex = 0;
    let visibleItems = [];
    
    // Open fullscreen modal when clicking on a gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Get only the currently visible items based on filter
            visibleItems = Array.from(galleryItems).filter(item => 
                item.style.display !== 'none'
            );
            
            // Find the index of the clicked item in the visible items array
            currentIndex = visibleItems.indexOf(this);
            
            // Open the modal with the clicked image
            openModal(this);
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('open');
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
    
    // Navigate to previous image
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateModal();
    });
    
    // Navigate to next image
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateModal();
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('open')) {
            if (e.key === 'Escape') {
                modal.classList.remove('open');
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
                updateModal();
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % visibleItems.length;
                updateModal();
            }
        }
    });
    
    // Function to open the modal with a specific gallery item
    function openModal(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        
        modal.classList.add('open');
    }
    
    // Function to update modal content when navigating
    function updateModal() {
        const item = visibleItems[currentIndex];
        openModal(item);
    }
    
    // Testimonial slider functionality
    const prevBtnSlider = document.querySelector('.prev-btn');
    const nextBtnSlider = document.querySelector('.next-btn');
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;
    
    // Show only the current slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Initialize with the first slide
    showSlide(currentSlide);
    
    // Previous button
    prevBtnSlider.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
    
    // Next button
    nextBtnSlider.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });
}); 