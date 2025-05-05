let num1 = document.getElementById('num1-el');
let num2 = document.getElementById('num2-el');

// Create four functions: add(), subtract(), divide(), multiply()
// Call the correct function when the user clicks on one of the buttons
// Perform the given calculation using num1 and num2
// Render the result of the calculation in the paragraph with id="sum-el"

let total = 0;

function add() {
    if (isNaN(num1.value) || isNaN(num1.value)) {
        document.getElementById('sum-el').textContent = 'Please input numbers!';
    } else {
        total = Number(num1.value) + Number(num2.value);
        document.getElementById('sum-el').textContent = total.toFixed(2);
    }
}

function subtract() {
    if (isNaN(num1.value) || isNaN(num1.value)) {
        document.getElementById('sum-el').textContent = 'Please input numbers!';
    } else {
        total = Number(num1.value) - Number(num2.value);
        document.getElementById('sum-el').textContent = total.toFixed(2);
    }
}

function divide() {
    if (isNaN(num1.value) || isNaN(num1.value)) {
        document.getElementById('sum-el').textContent = 'Please input numbers!';
    } else {
        total = Number(num1.value) / Number(num2.value);
        document.getElementById('sum-el').textContent = total.toFixed(2);
    }
}

function multiply() {
    if (isNaN(num1.value) || isNaN(num1.value)) {
        document.getElementById('sum-el').textContent = 'Please input numbers!';
    } else {
        total = Number(num1.value) * Number(num2.value);
        document.getElementById('sum-el').textContent = total.toFixed(2);
    }
}

// E.g. if the user clicks on the "Plus" button, you should render
// "Sum: 10" (since 8 + 2 = 10) inside the paragraph with id="sum-el"
