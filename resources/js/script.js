// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready!');
    
    // Menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('.content-section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Vertical Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});

// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Red Hat Bootstrap Components loaded!');
    
    // Mega menu hover functionality for desktop
    const megaDropdown = document.querySelector('.mega-dropdown');
    const megaMenu = document.querySelector('.mega-menu');
    
    if (megaDropdown && window.innerWidth >= 992) {
        let timeout;
        
        megaDropdown.addEventListener('mouseenter', function() {
            clearTimeout(timeout);
            const dropdownToggle = this.querySelector('.dropdown-toggle');
            const bsDropdown = new bootstrap.Dropdown(dropdownToggle);
            bsDropdown.show();
        });
        
        megaDropdown.addEventListener('mouseleave', function() {
            timeout = setTimeout(() => {
                const dropdownToggle = this.querySelector('.dropdown-toggle');
                const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                if (bsDropdown) {
                    bsDropdown.hide();
                }
            }, 300);
        });
        
        if (megaMenu) {
            megaMenu.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
            });
            
            megaMenu.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    const dropdownToggle = megaDropdown.querySelector('.dropdown-toggle');
                    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                    if (bsDropdown) {
                        bsDropdown.hide();
                    }
                }, 300);
            });
        }
    }
    
    // Regular dropdowns hover for desktop
    const regularDropdowns = document.querySelectorAll('.nav-item.dropdown:not(.mega-dropdown)');
    regularDropdowns.forEach(dropdown => {
        if (window.innerWidth >= 992) {
            let timeout;
            
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
                const dropdownToggle = this.querySelector('.dropdown-toggle');
                const bsDropdown = new bootstrap.Dropdown(dropdownToggle);
                bsDropdown.show();
            });
            
            dropdown.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    const dropdownToggle = this.querySelector('.dropdown-toggle');
                    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
                    if (bsDropdown) {
                        bsDropdown.hide();
                    }
                }, 200);
            });
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) {
                            bsCollapse.hide();
                        }
                    }
                }
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and resource items
    document.querySelectorAll('.quick-access-card, .doc-category-card, .resource-item').forEach(el => {
        observer.observe(el);
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add hover effect to mega menu items
    const megaMenuItems = document.querySelectorAll('.mega-menu .dropdown-item');
    megaMenuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add hover effect to regular dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-menu:not(.mega-menu) .dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Console message
    console.log('%c Red Hat Enterprise Linux 10 Documentation ', 'background: #EE0000; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Built with Bootstrap 5.3 Mega Menu ', 'background: #563d7c; color: white; font-size: 12px; padding: 5px;');
});