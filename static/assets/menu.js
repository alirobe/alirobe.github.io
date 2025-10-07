// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle && sidebar) {
    // Restore menu state from localStorage on page load
    if (window.innerWidth <= 768 && localStorage.getItem('mobileMenuOpen') === 'true') {
        // Disable transitions temporarily
        sidebar.style.transition = 'none';
        menuToggle.classList.add('active');
        sidebar.classList.add('active');
        // Re-enable transitions after a frame
        requestAnimationFrame(() => {
            sidebar.style.transition = '';
        });
    }

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');

        // Save state to localStorage
        if (sidebar.classList.contains('active')) {
            localStorage.setItem('mobileMenuOpen', 'true');
        } else {
            localStorage.removeItem('mobileMenuOpen');
        }
    });

    // Close menu when clicking overlay
    sidebar.addEventListener('click', function(e) {
        if (e.target === this && this.classList.contains('active')) {
            menuToggle.classList.remove('active');
            this.classList.remove('active');
            localStorage.removeItem('mobileMenuOpen');
        }
    });

    // Keep menu open when clicking a link (state persists via localStorage)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Menu will stay open on next page due to localStorage
            // No need to close it here
        });
    });

    // Clear state when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            localStorage.removeItem('mobileMenuOpen');
        }
    });
}
