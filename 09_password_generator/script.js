let firstPassword = document.querySelector('#password-1');
let secondPassword = document.querySelector('#password-2');
let generateButton = document.querySelector('#generate-pass');
let clipboardLeft = document.querySelector('.clipboard-left');
let clipboardRight = document.querySelector('.clipboard-right');

const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"];

// return an array of symbols from the characters array
let symbolRegex = /[^a-zA-Z0-9]/;
const symbols = characters.filter((character) => symbolRegex.test(character));

// return an array of the alphabet from the characters array
let alphabetRegex = /[a-zA-Z]+/;
const alphabet = characters.filter((character) => alphabetRegex.test(character));

// return an array of numbers from the characters array
let numericRegex = /[0-9]+/;
const numeric = characters.filter((character) => numericRegex.test(character));

function generateRandomCharacter() {
    let randomNumber = Math.floor(Math.random() * characters.length); // get a random number to select index in array
    let char = '';
    char += characters[randomNumber];
    return char;
}

function generateRandomPassword() {
    let password = '';
    for (let i = 0; i < 15; i++) {
        password += generateRandomCharacter();
    }
    return password;
}

generateButton.addEventListener('click', function () {
    firstPassword.textContent = generateRandomPassword();
    secondPassword.textContent = generateRandomPassword();
});

clipboardLeft.addEventListener('click', function () {
    let text = document.getElementById('password-1').innerHTML;
    navigator.clipboard.writeText(text);
});

clipboardRight.addEventListener('click', function () {
    let text = document.getElementById('password-2').innerHTML;
    navigator.clipboard.writeText(text);
});