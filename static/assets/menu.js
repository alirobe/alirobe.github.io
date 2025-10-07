// Mobile menu toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Close menu when clicking overlay
    sidebar.addEventListener('click', function(e) {
        if (e.target === this && this.classList.contains('active')) {
            menuToggle.classList.remove('active');
            this.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('active');
            }
        });
    });
}
