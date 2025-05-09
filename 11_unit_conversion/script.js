const inputs = document.querySelector('#inputs');
const wrapperTitle = document.querySelector('.wrapper-title');
const userInput = document.querySelector('#user-input');
const userBtn = document.querySelector('#user-btn');
const display = document.querySelector('#display');
const insertTitle = document.querySelector('.insert-title');
const insertValue = document.querySelector('.insert-value');


function lengthCoversionToFeet(userVal) {
    return (userVal * 3.28084).toFixed(3);
}

function lengthCoversionToMetre(userVal) {
    return (userVal * 0.3048).toFixed(3);
}

function volumeCoversionToGallons(userVal) {
    return (userVal * 3.78541).toFixed(3);
}

function volumeCoversionToLitres(userVal) {
    return (userVal * 0.219969).toFixed(3);
}

function massCoversionToPounds(userVal) {
    return (userVal * 2.20462).toFixed(3);
}

function massCoversionToKilograms(userVal) {
    return (userVal * 0.453592).toFixed(3);
}


function convertUnits() {
    insert1 = `<div class='output'><h2 class='insert-title'>Length (Metre/Feet)</h2>
                <p class='insert-value'>${userInput.value} meters = ${lengthCoversionToFeet(userInput.value)} feet | ${userInput.value} feet = ${lengthCoversionToMetre(userInput.value)} metres</p></div>`;

    insert2 = `<div class='output'><h2 class='insert-title'>Volume (Liters/Gallons)</h2>
                <p class='insert-value'>${userInput.value} liters = ${volumeCoversionToGallons(userInput.value)} gallons | ${userInput.value} gallons = ${volumeCoversionToGallons(userInput.value)} litres</p></div>`;

    insert3 = `<div class='output'><h2 class='insert-title'>Mass (Kilograms/Pounds)</h2>
                <p class='insert-value'>${userInput.value} kilos = ${massCoversionToPounds(userInput.value)} pounds | ${userInput.value} pounds = ${massCoversionToKilograms(userInput.value)} kilos</p></div>`;

    return display.innerHTML = insert1 + insert2 + insert3;
}

userBtn.addEventListener('click', function () {
    convertUnits();
});