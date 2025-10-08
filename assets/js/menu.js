const menuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const mobileHomeTitle = document.querySelector('.mobile-home-title');

if (menuToggle && sidebar) {
    if (window.innerWidth <= 768 && localStorage.getItem('mobileMenuOpen') === 'true') {
        sidebar.style.transition = 'none';
        menuToggle.classList.add('active');
        sidebar.classList.add('active');
        requestAnimationFrame(() => { sidebar.style.transition = ''; });
    }

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');

        if (sidebar.classList.contains('active')) {
            localStorage.setItem('mobileMenuOpen', 'true');
        } else {
            localStorage.removeItem('mobileMenuOpen');
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    if (mobileHomeTitle) {
        mobileHomeTitle.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
        mobileHomeTitle.style.cursor = 'pointer';
    }

    sidebar.addEventListener('click', function(e) {
        if (e.target === this && this.classList.contains('active')) {
            menuToggle.classList.remove('active');
            this.classList.remove('active');
            localStorage.removeItem('mobileMenuOpen');
        }
    });

    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', ()=>{ /* noop */ });
    });

    // Clear state when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            localStorage.removeItem('mobileMenuOpen');
        }
    });
}
