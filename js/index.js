document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect untuk Hero Section (index.html)
    const typedTextElement = document.getElementById('typed-text');
    const typedTextPrefixElement = document.getElementById('typed-text-prefix');

    if (typedTextElement && typedTextPrefixElement) {
        const name = "Syida"; // Nama Anda
        const prefix = "Hai, saya "; // Teks prefix
        let charIndex = 0;
        let prefixCharIndex = 0;
        const typingSpeed = 110; // Kecepatan mengetik nama
        const prefixTypingSpeed = 75; // Kecepatan mengetik prefix

        // Buat elemen span untuk kursor
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';

        function typePrefix() {
            if (prefixCharIndex < prefix.length) {
                typedTextPrefixElement.textContent += prefix.charAt(prefixCharIndex);
                prefixCharIndex++;
                setTimeout(typePrefix, prefixTypingSpeed);
            } else {
                // Setelah prefix selesai diketik, langsung mulai mengetik nama.
                // Kursor tidak akan ditambahkan di sini.
                setTimeout(typeName, 200); // Jeda singkat sebelum nama muncul
            }
        }
        
        function typeName() {
            if (charIndex < name.length) {
                // Sembunyikan kursor jika ada saat nama sedang diketik (untuk menghindari kursor ganda jika ada)
                // Namun, dalam kasus ini, kita hanya menambahkan kursor di akhir.
                typedTextElement.textContent += name.charAt(charIndex);
                charIndex++;
                setTimeout(typeName, typingSpeed);
            } else {
                // Setelah nama selesai diketik, tambahkan kursor di paling akhir.
                // Kursor akan muncul setelah nama "Syida".
                typedTextElement.insertAdjacentElement('afterend', cursorSpan);
            }
        }
        
        // Mulai animasi ketik untuk prefix terlebih dahulu
        typePrefix();
    }
});