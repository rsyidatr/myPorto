document.addEventListener('DOMContentLoaded', function() {

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
        // More robust check for active link, especially if relative paths differ
        const linkPath = link.getAttribute('href');

        if (linkFileName === currentPageFileName || linkPath === currentPageFileName || (currentPageFileName === "index.html" && linkPath === "../index.html")) {
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
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CSS tambahan untuk cursor ketik (jika efek ketik aktif)
    // Moved to global.js as it's a general style utility
    const style = document.createElement('style');
    style.innerHTML = `
        .typing-cursor {
            display: inline-block;
            width: 2px; /* Thinner cursor */
            height: 1em; /* Match text height */
            background-color: var(--dark-text); /* Use theme color */
            animation: blink 0.8s infinite; /* Slightly slower blink */
            margin-left: 3px; /* More space */
            vertical-align: middle; /* Align better with text */
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Skill Bar Animation (moved from about.js for potential global use if needed)
    const skillProgressBars = document.querySelectorAll('.progress-bar'); // More generic selector

    const animateSkillBar = (bar) => {
        const targetWidth = bar.getAttribute('aria-valuenow') + '%';
        // Animation is now primarily handled by CSS transition after width is set
        // Ensure initial width is 0% (can be set in CSS or here)
        // bar.style.width = '0%'; // Already set in CSS

        // Trigger reflow to restart animation if already visible (not needed with IntersectionObserver once:true)
        // void bar.offsetWidth;

        bar.style.width = targetWidth;
    };

    if (skillProgressBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBar(entry.target);
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }); // Trigger when 30% visible or 50px from bottom

        skillProgressBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
});