document.addEventListener('DOMContentLoaded', function () {
    
    // Logic to reset carousel to first slide when modal is closed
    const projectModals = document.querySelectorAll('.modal');
    projectModals.forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function () {
            const carouselElement = this.querySelector('.carousel');
            if (carouselElement) {
                const carousel = bootstrap.Carousel.getInstance(carouselElement);
                if (carousel) {
                    carousel.to(0);
                }
            }
        });
    });

    // New, robust logic for "Show More/Less" buttons
    const showMoreButtons = document.querySelectorAll('.show-more-btn');

    showMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('expanded');

            const targetSelector = this.dataset.target;
            const projectContainer = document.querySelector(targetSelector);
            if (!projectContainer) return;

            const itemsToToggle = projectContainer.querySelectorAll('.project-item-hidden');
            
            itemsToToggle.forEach(item => {
                // Toggle a class that controls visibility and animation
                item.classList.toggle('is-visible');
            });
            
            // Update button text and icon
            const buttonText = this.querySelector('span');
            const buttonIcon = this.querySelector('i');

            if (this.classList.contains('expanded')) {
                buttonText.textContent = 'Tampilkan Lebih Sedikit';
                if(buttonIcon) {
                    buttonIcon.classList.remove('bi-chevron-down');
                    buttonIcon.classList.add('bi-chevron-up');
                }
            } else {
                buttonText.textContent = 'Tampilkan Lebih Banyak';
                if(buttonIcon) {
                    buttonIcon.classList.remove('bi-chevron-up');
                    buttonIcon.classList.add('bi-chevron-down');
                }
            }
        });
    });

});