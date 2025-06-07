document.addEventListener('DOMContentLoaded', function () {
    // Menangani semua modal di halaman proyek
    const projectModals = document.querySelectorAll('.modal');

    projectModals.forEach(modal => {
        // Mendengarkan event ketika modal akan disembunyikan
        modal.addEventListener('hidden.bs.modal', function () {
            
            // Cari carousel di dalam modal yang baru saja ditutup
            const carouselElement = this.querySelector('.carousel');
            
            // Jika ada carousel di dalam modal ini
            if (carouselElement) {
                // Dapatkan instance Bootstrap Carousel
                const carousel = bootstrap.Carousel.getInstance(carouselElement);
                
                // Jika instance carousel ditemukan, reset ke slide pertama (indeks 0)
                if (carousel) {
                    carousel.to(0);
                }
            }
        });
    });
});