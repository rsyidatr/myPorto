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
                typedTextElement.insertAdjacentElement('afterend', cursorSpan);
            }
        }
        
        typePrefix();
    }

    // Logika untuk "More" button dihapus karena section terkait dihapus
});