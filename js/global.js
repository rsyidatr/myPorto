document.addEventListener('DOMContentLoaded', function() {

    // === KODE LOADING SCREEN SEKALI TAYANG ===
    const loadingOverlay = document.getElementById('loading-overlay');
    const fountainContainer = document.querySelector('.fountain-icons-container');

    // List of skills and tools for the fountain animation
    const fountainIcons = [
        '<i class="bi bi-filetype-html"></i>',
        '<i class="bi bi-filetype-css"></i>',
        '<i class="bi bi-filetype-js"></i>',
        '<i class="bi bi-phone"></i>', // Flutter (or general phone icon)
        '<i class="bi bi-bootstrap"></i>',
        '<i class="bi bi-wind"></i>', // TailwindCSS
        '<i class="bi bi-git"></i>',
        '<i class="bi bi-github"></i>',
        '<i class="bi bi-palette-fill"></i>', // UI/UX general
        '<i class="bi bi-pencil-fill"></i>', // Design general
        '<i class="bi bi-code-slash"></i>', // Coding general
        '<i class="bi bi-people-fill"></i>', // Scrum/Agile
        '<i class="bi bi-android2"></i>', // Android Studio
        // Figma SVG - Pastikan path ini benar jika Anda menggunakannya sebagai file terpisah
        '<svg class="skill-tool-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.5 6a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 16.5 6v6a1.5 1.5 0 0 1-1.5 1.5h-1.5a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 6 18V7.5A1.5 1.5 0 0 1 7.5 6zm1.5 0v1.5h6V6h-6zm0 3v1.5h3V9h-3zM9 13.5v-3h1.5v3H9zm0 1.5h1.5v3H9v-3zm3-1.5v-1.5h3V12h-3z"/></svg>'
    ];

    function createFountainIcon() {
        if (!fountainContainer) return;

        const iconHtml = fountainIcons[Math.floor(Math.random() * fountainIcons.length)];
        const iconElement = document.createElement('div');
        iconElement.innerHTML = iconHtml;
        iconElement.classList.add('fountain-icon');

        // Randomize trajectory (relative to start position)
        // endX will be relative offset from center (0)
        const endX = (Math.random() * window.innerWidth * 0.6) - (window.innerWidth * 0.3); // -30% to +30% of viewport width
        // endY will be relative offset upwards. Negative value means moving upwards.
        const endY = -(Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.3); // Move up 30% to 100% of viewport height
        const rotateDeg = Math.random() * 720 - 360; // -360 to +360 degrees
        const scale = Math.random() * 0.8 + 1.2; // Scale from 1.2 to 2.0 (larger icons)

        iconElement.style.setProperty('--endX', `${endX}px`);
        iconElement.style.setProperty('--endY', `${endY}px`);
        iconElement.style.setProperty('--rotateDeg', `${rotateDeg}deg`);
        iconElement.style.setProperty('--scale', `${scale}`);
        iconElement.style.setProperty('--duration', `${Math.random() * 1.5 + 2.5}s`); // 2.5s to 4s
        iconElement.style.setProperty('--delay', `${Math.random() * 0.5}s`); // 0s to 0.5s delay

        fountainContainer.appendChild(iconElement);

        // Remove icon after animation to prevent DOM clutter
        iconElement.addEventListener('animationend', () => {
            iconElement.remove();
        });
    }

    // Interval to create fountain icons
    let fountainInterval;
    if (loadingOverlay) {
        if (sessionStorage.getItem('hasAlreadyLoaded')) {
            loadingOverlay.style.display = 'none';
        } else {
            // Start fountain animation during loading
            fountainInterval = setInterval(createFountainIcon, 100); // Create an icon every 100ms

            window.addEventListener('load', () => {
                setTimeout(() => {
                    loadingOverlay.classList.add('hidden');
                    clearInterval(fountainInterval); // Stop creating icons
                    sessionStorage.setItem('hasAlreadyLoaded', 'true');
                }, 2200); // Match loading bar animation duration + small buffer
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

    // Active Nav Link Highlighting
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPageFileName = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');

        const linkFileName = link.getAttribute('href').split("/").pop() || "index.html";
        const linkPath = link.getAttribute('href');

        // Check if the link href is the current page, or if it's the home link on the index page
        if (linkFileName === currentPageFileName || linkPath === currentPageFileName || (currentPageFileName === "index.html" && (linkPath === "index.html" || linkPath === ""))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Update Tahun Copyright di Footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll untuk link internal (jika ada yang menggunakan #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                const targetElement = document.querySelector(hrefAttribute);
                
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const additionalOffset = 20; // Jarak aman tambahan
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