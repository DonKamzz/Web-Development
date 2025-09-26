// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Initialize contact form validation if exists
    initContactForm();
    
    // Initialize artist filters if exists
    initArtistFilters();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Contact Form Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
                contactForm.classList.add('form-submitted');
                
                setTimeout(() => {
                    contactForm.classList.remove('form-submitted');
                }, 500);
            }, 1500);
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
}

function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('#contactForm .form-control');
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    field.classList.remove('error', 'success');
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (field.type === 'text' || field.tagName === 'TEXTAREA') {
        isValid = value.length > 0;
    }
    
    if (!isValid) {
        field.classList.add('error');
    } else {
        field.classList.add('success');
    }
    
    return isValid;
}

function clearError(e) {
    const field = e.target;
    field.classList.remove('error');
}

// Artist Filtering
function initArtistFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const artistProfiles = document.querySelectorAll('.artist-profile');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.trim();
            
            // Filter artists
            artistProfiles.forEach(artist => {
                if (filter === 'All' || artist.getAttribute('data-genre') === filter) {
                    artist.style.display = 'block';
                } else {
                    artist.style.display = 'none';
                }
            });
        });
    });
}

// Smooth scrolling for anchor links
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