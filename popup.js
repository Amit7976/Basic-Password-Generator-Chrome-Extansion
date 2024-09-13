document.addEventListener('DOMContentLoaded', function () {
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('lengthValue');
    const generateButton = document.getElementById('generate');
    const passwordDisplay = document.getElementById('passwordDisplay');

    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');

    lengthSlider.addEventListener('input', function () {
        lengthValue.textContent = lengthSlider.value;
    });

    generateButton.addEventListener('click', function () {
        const length = parseInt(lengthSlider.value);
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;

        const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        passwordDisplay.textContent = password;
    });

    // Function to copy the password to the clipboard
    passwordDisplay.addEventListener('click', function () {
        const password = passwordDisplay.textContent;
        if (password) {
            navigator.clipboard.writeText(password).then(() => {
                alert('Password copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy password: ', err);
            });
        }
    });

    function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

        let possibleChars = '';
        if (includeUppercase) possibleChars += uppercase;
        if (includeLowercase) possibleChars += lowercase;
        if (includeNumbers) possibleChars += numbers;
        if (includeSymbols) possibleChars += symbols;

        if (!possibleChars) return 'Select at least one option';

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * possibleChars.length);
            password += possibleChars[randomIndex];
        }

        return password;
    }
});
