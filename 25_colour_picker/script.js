// Variables

const selections = ['Monochrome', 'Monochrome-dark', 'Monochrome-light', 'Analogic', 'Complement', 'Analogic-complement', 'Triad', 'Quad'];

const schemeDropdown = document.querySelector('#scheme-dropdown');

const paletteContainer = document.querySelector('#palette');

// Map selections to dropdown menu

selections.map((selection) => {
    let selectHtml = '';
    selectHtml += `<option>${selection}</option>`;
    schemeDropdown.innerHTML += selectHtml;
});

// Get dropdown value

let menuSelectionValue = '';
let menuSelection = document.getElementById('scheme-dropdown');
menuSelection.addEventListener('change', function (event) {
    menuSelectionValue = event.target.value;
});

// Get colour value

let colourPicker = document.getElementById('colour-picker');
let colourSelectionValue;

colourPicker.addEventListener("change", watchColourPicker, false);

function watchColourPicker(event) {
    let userSelection = event.target.value; // hex
    colourSelectionValue = userSelection.slice(1, 7);
}

// Send request to API

const getSchemeBtn = document.querySelector('#get-scheme-btn');

getSchemeBtn.addEventListener('click', function (event) {
    event.preventDefault();
    renderPalette();
});

// Render colour palette

function renderPalette() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${colourSelectionValue}&format=string&mode=${menuSelectionValue.toLowerCase()}&count=5`)
        .then(resource => resource.json())
        .then(data => {
            let paletteHtml = '';
            data.colors.forEach((colour) => {
                paletteHtml += `
                    <div class='swatch-container'>
                        <div class='colour-value' style='background-color:${colour.rgb.value}'></div>
                        <p class='colour-hex'>${colour.hex.value}</p>
                    </div>
                `;
            });

            paletteContainer.innerHTML = paletteHtml;
        }); // colours array
}