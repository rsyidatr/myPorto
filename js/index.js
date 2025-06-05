document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect untuk Hero Section (index.html)
    const typedTextElement = document.getElementById('typed-text');
    const typedTextPrefixElement = document.getElementById('typed-text-prefix');

    if (typedTextElement && typedTextPrefixElement) {
        const name = "Syida"; // Ganti dengan nama Anda
        const prefix = "Hai, saya ";
        let charIndex = 0;
        let prefixCharIndex = 0;
        const typingSpeed = 110; // Slightly adjusted speed
        const prefixTypingSpeed = 75; // Slightly adjusted speed
        let cursorVisible = false; // Manage cursor visibility explicitly

        // Create cursor element
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typing-cursor';
        // typedTextElement.parentNode.appendChild(cursorSpan); // Append after the typed-text span

        function typePrefix() {
            if (prefixCharIndex < prefix.length) {
                typedTextPrefixElement.textContent += prefix.charAt(prefixCharIndex);
                prefixCharIndex++;
                setTimeout(typePrefix, prefixTypingSpeed);
            } else {
                // After prefix is done, append cursor next to prefix, then start typing name
                typedTextPrefixElement.insertAdjacentElement('afterend', cursorSpan);
                cursorVisible = true;
                setTimeout(typeName, 300); // Jeda sebelum nama muncul
            }
        }

        function typeName() {
            if (charIndex < name.length) {
                if (cursorVisible) cursorSpan.style.display = 'none'; // Hide cursor while typing name
                typedTextElement.textContent += name.charAt(charIndex);
                charIndex++;
                setTimeout(typeName, typingSpeed);
            } else {
                if (cursorVisible) cursorSpan.style.display = 'inline-block'; // Show cursor after name is typed
                // Optional: Add blinking cursor effect directly via JS if not using global CSS
            }
        }

        // Mulai animasi ketik untuk prefix terlebih dahulu
        typePrefix();
    }
});