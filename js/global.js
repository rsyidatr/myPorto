document.addEventListener('DOMContentLoaded', function() {

    // === KODE LOADING SCREEN SEKALI TAYANG ===
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingTextProgress = document.getElementById('loading-text-progress');

    if (loadingOverlay) {
        if (sessionStorage.getItem('hasAlreadyLoaded')) {
            loadingOverlay.style.display = 'none';
        } else {
            window.addEventListener('load', () => {
                let progress = 0;
                const totalDuration = 2200;
                const intervalTime = 20;
                const steps = totalDuration / intervalTime;
                let currentStep = 0;

                const loadingTextInterval = setInterval(() => {
                    currentStep++;
                    progress = (currentStep / steps) * 100;
                    if(loadingTextProgress) {
                        loadingTextProgress.style.setProperty('--text-fill-progress', `${progress}%`);
                    }

                    if (progress >= 100) {
                        clearInterval(loadingTextInterval);
                        setTimeout(() => {
                            loadingOverlay.classList.add('hidden');
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
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out-cubic'
        });
    }

    // Efek Navbar Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Scrollspy logic to update active nav link
    function updateActiveNavLink() {
        const sections = {
            home: document.getElementById('home-section'),
            about: document.getElementById('quick-about'),
            skills: document.getElementById('skills-and-tools'),
            projects: document.getElementById('projects-section'),
            contact: document.getElementById('contact-section')
        };

        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const offset = navbarHeight + 50; 
        const scrollPos = window.scrollY + offset;

        let activeNavLinkHref = '#home-section'; 

        const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 5);

        if (isAtBottom) {
             activeNavLinkHref = '#contact-section';
        } else if (sections.contact && scrollPos >= sections.contact.offsetTop) {
            activeNavLinkHref = '#contact-section';
        } else if (sections.projects && scrollPos >= sections.projects.offsetTop) {
            activeNavLinkHref = '#projects-section';
        } else if (sections.skills && scrollPos >= sections.skills.offsetTop) {
            activeNavLinkHref = '#skills-and-tools';
        } else if (sections.about && scrollPos >= sections.about.offsetTop) {
            activeNavLinkHref = '#quick-about';
        } else if (sections.home && scrollPos >= sections.home.offsetTop) {
            activeNavLinkHref = '#home-section';
        }

        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        const activeLink = document.querySelector(`.navbar-nav .nav-link[href="${activeNavLinkHref}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    function updateScrollProgressBar() {
        if (!scrollProgressBar) return;

        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const scrolled = window.scrollY;

        let progress = 0;
        if (fullHeight - windowHeight > 0) {
            progress = (scrolled / (fullHeight - windowHeight)) * 100;
        }
        
        scrollProgressBar.style.width = `${progress}%`;

        if (navbar) {
            scrollProgressBar.style.top = `${navbar.offsetHeight}px`;
        }
    }

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            updateScrollProgressBar();
        }, 50);
    });

    window.addEventListener('load', () => {
        updateActiveNavLink();
        updateScrollProgressBar();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && document.querySelector(hrefAttribute)) {
                e.preventDefault();
                const targetElement = document.querySelector(hrefAttribute);
                
                const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                const additionalOffset = 20;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - additionalOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Bootstrap tooltips for project icons
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});