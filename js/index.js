document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect untuk Hero Section (index.html)
    const typedTextElement = document.getElementById('typed-text');
    const typedTextPrefixElement = document.getElementById('typed-text-prefix');

    if (typedTextElement && typedTextPrefixElement) {
        const name = "Syida"; // Nama Anda
        const prefix = "Hai, saya "; // Teks prefix
        let charIndex = 0;
        let prefixCharIndex = 0;
        const typingSpeed = 100; // Kecepatan mengetik nama
        const prefixTypingSpeed = 72; // Kecepatan mengetik prefix

        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';

        function typePrefix() {
            if (prefixCharIndex < prefix.length) {
                typedTextPrefixElement.textContent += prefix.charAt(prefixCharIndex);
                prefixCharIndex++;
                setTimeout(typePrefix, prefixTypingSpeed);
            } else {
                setTimeout(typeName, 200); 
            }
        }
        
        function typeName() {
            if (charIndex < name.length) {
                typedTextElement.textContent += name.charAt(charIndex);
                charIndex++;
                setTimeout(typeName, typingSpeed);
            } else {
                // Pastikan cursor ditambahkan setelah elemen teks yang diketik
                typedTextElement.insertAdjacentElement('afterend', cursorSpan);
            }
        }
        
        // Mulai efek mengetik
        typePrefix();

        // KODE BARU: CSS untuk cursor ketik dipindahkan ke sini dari global.js
        const style = document.createElement('style');
        style.innerHTML = `
            .typing-cursor {
                display: inline-block;
                width: 2px; /* Thinner cursor */
                height: 1.1em; /* Match text height */
                background-color: var(--dark-text); /* Use theme color */
                animation: blink 0.8s infinite; /* Slightly slower blink */
                margin-left: 4px;
                vertical-align: text-bottom; /* Align better with text */
            }
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});