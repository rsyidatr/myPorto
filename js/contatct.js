document.addEventListener('DOMContentLoaded', function() {
    // Penanganan Form Kontak (Hanya Tampilan Statis)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah submit form standar
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name && email && subject && message) {
                formMessage.textContent = 'Pesan Anda telah "dikirim"! (Ini adalah demo statis, tidak ada email yang benar-benar dikirim.)';
                formMessage.className = 'mt-3 alert alert-success'; // Bootstrap class
                contactForm.reset(); // Mengosongkan form
            } else {
                formMessage.textContent = 'Harap isi semua kolom yang wajib diisi.';
                formMessage.className = 'mt-3 alert alert-danger';
            }

            // Hilangkan pesan setelah beberapa detik
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'mt-3';
            }, 7000);
        });
    }
});