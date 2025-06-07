document.addEventListener('DOMContentLoaded', function() {

    // === KODE LOADING SCREEN SEKALI TAYANG ===
    const loadingOverlay = document.getElementById('loading-overlay');
    // const fountainContainer = document.querySelector('.fountain-icons-container'); // Removed as requested
    const loadingTextProgress = document.getElementById('loading-text-progress'); // Get the text element

    // Fountain icon creation function removed as requested
    // function createFountainIcon() { ... }

    // Interval to create fountain icons logic removed as requested
    // let fountainInterval;
    if (loadingOverlay) {
        if (sessionStorage.getItem('hasAlreadyLoaded')) {
            loadingOverlay.style.display = 'none';
        } else {
            // Fountain animation interval creation removed
            // fountainInterval = setInterval(createFountainIcon, 100);

            window.addEventListener('load', () => {
                let progress = 0;
                const totalDuration = 2200;
                const intervalTime = 20;
                const steps = totalDuration / intervalTime;
                let currentStep = 0;

                const loadingTextInterval = setInterval(() => {
                    currentStep++;
                    progress = (currentStep / steps) * 100;
                    loadingTextProgress.style.setProperty('--text-fill-progress', `${progress}%`);

                    if (progress >= 100) {
                        clearInterval(loadingTextInterval);
                        setTimeout(() => {
                            loadingOverlay.classList.add('hidden');
                            // clearInterval(fountainInterval); // Removed as requested
                            sessionStorage.setItem('hasAlreadyLoaded', 'true');
                        }, 200);
                    }
                }, intervalTime);
            });
        }
    }
    // === AKHIR KODE LOADING SCREEN ===


    // Inisialisasi AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,    // Duration of animation
            once: true,        // Whether animation should happen only once - while scrolling down
            offset: 100,       // Offset (in px) from the original trigger point
            easing: 'ease-in-out-cubic' // Default easing for AOS animations
        });
    }

    // Efek Navbar Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) { // Slightly increased scroll threshold
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Scrollspy logic to update active nav link
    function updateActiveNavLink() {
        // Get relevant sections that correspond to nav links
        const homeSection = document.getElementById('home-section');
        const projectsSection = document.getElementById('projects-section');
        const footerSection = document.getElementById('footer-section');

        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offset = navbarHeight + 10; // Offset for better accuracy

        // Get current scroll position with consideration for navbar height
        const scrollPos = window.scrollY + offset;

        // Reset active classes on all links
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });

        let activeNavLinkHref = '#home-section'; // Default to Beranda

        // Check if user is scrolled to the very bottom
        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 5); // 5px buffer for bottom detection

        if (isAtBottom) {
            activeNavLinkHref = '#footer-section';
        } else if (projectsSection && scrollPos >= projectsSection.offsetTop) {
            // If scrolled past projects section start
            activeNavLinkHref = '#projects-section';
        } else {
            // Otherwise, it's in the home section implicitly
            activeNavLinkHref = '#home-section';
        }
        
        // Apply active class
        const activeLink = document.querySelector(`.navbar-nav .nav-link[href="${activeNavLinkHref}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    // Function to update the scroll progress bar
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    function updateScrollProgressBar() {
        if (!scrollProgressBar) return;

        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const scrolled = window.scrollY;

        // Calculate scroll percentage
        let progress = 0;
        if (fullHeight - windowHeight > 0) { // Avoid division by zero
            progress = (scrolled / (fullHeight - windowHeight)) * 100;
        }
        
        scrollProgressBar.style.width = `${progress}%`;

        // Position the progress bar directly below the navbar
        if (navbar) {
            scrollProgressBar.style.top = `${navbar.offsetHeight}px`;
        }
    }


    // Debounce scroll event for performance, combining scrollspy and progress bar update
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            updateScrollProgressBar();
        }, 50); // Adjust debounce time as needed
    });

    // Set initial active link and progress bar on page load
    window.addEventListener('load', () => {
        updateActiveNavLink();
        updateScrollProgressBar();
    });

    // Smooth scroll for internal links (using #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                const targetElement = document.querySelector(hrefAttribute);
                
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const additionalOffset = 20; // Additional safe distance
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - additionalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});