// document.addEventListener('DOMContentLoaded', function () {

//     // Logic for "Show More/Less" buttons
//     const showMoreButtons = document.querySelectorAll('.show-more-btn');

//     showMoreButtons.forEach(button => {
//         button.addEventListener('click', function(e) {
//             e.preventDefault();
//             this.classList.toggle('expanded');

//             const targetSelector = this.dataset.target;
//             const projectContainer = document.querySelector(targetSelector);
//             if (!projectContainer) return;

//             const itemsToToggle = projectContainer.querySelectorAll('.project-item-hidden');

//             itemsToToggle.forEach(item => {
//                 // Toggle a class that controls visibility and animation
//                 item.classList.toggle('is-visible');
//             });

//             // Update button text and icon
//             const buttonText = this.querySelector('span');
//             const buttonIcon = this.querySelector('i');

//             if (this.classList.contains('expanded')) {
//                 buttonText.textContent = 'Tampilkan Lebih Sedikit';
//                 if(buttonIcon) {
//                     buttonIcon.classList.remove('bi-chevron-down');
//                     buttonIcon.classList.add('bi-chevron-up');
//                 }
//             } else {
//                 buttonText.textContent = 'Tampilkan Lebih Banyak';
//                 if(buttonIcon) {
//                     buttonIcon.classList.remove('bi-chevron-up');
//                     buttonIcon.classList.add('bi-chevron-down');
//                 }
//             }
//         });
//     });

//     // All logic for project detail modals and image zoom modals is removed as per request.

// });