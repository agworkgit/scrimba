import { menuArray } from '../data/data.js';

const shoppingList = document.querySelector('#shopping-list');
const totalAmount = document.querySelector('#total-amount');
const lineDetails = document.querySelector('#item-insert');
const completeBtn = document.querySelector('#complete-btn');
const payBtn = document.querySelector('#pay-btn');
const exitBtn = document.querySelector('#exit-btn');
const modal = document.querySelector('#enter-payment');
const formName = document.querySelector('#form-name');
const formCvv = document.querySelector('#form-cvv');
const orderBreakdown = document.querySelector('#order-breakdown');

const ordersArray = [];

// Render menu items
const renderMenu = function (menuArr) {
    return menuArr.map((item) => {
        const { name, ingredients, id, price, emoji } = item;
        const ingredientList = ingredients.join(', ');

        return `
        <div id='${id}' class='shopping-item'>
            <div class='item-image'>${emoji}</div>
            <div class='item-info'>
                <h2 class='item-title'>${name}</h2>
                <p class='item-ingredients'>${ingredientList}</p>
                <p class='item-price'>£${price}</p>
            </div>
            <button class='add-button' data-${name}='${id}'>+</button>
        </div>
    `;
    }).join('');
};

shoppingList.innerHTML = renderMenu(menuArray);

// Event listener
document.addEventListener('click', function (e) {
    if (e.target.dataset.pizza) {
        handleAddClick(e.target.dataset.pizza);
    }
    if (e.target.dataset.hamburger) {
        handleAddClick(e.target.dataset.hamburger);
    }
    if (e.target.dataset.beer) {
        handleAddClick(e.target.dataset.beer);
    }
    if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove);
    }
});

// Handle click events
function handleAddClick(buttonId) {
    menuArray.forEach(function (item) {
        const targetButtonId = Number(buttonId);
        if (item.id == targetButtonId) {
            renderAddedItem(item);
            updateTotal();
        }
    });

    if (ordersArray.length > 0) {
        orderBreakdown.style.display = 'block';
    }
}

function handleRemoveClick(itemId) {
    const index = ordersArray.findIndex(order => order.id == itemId);
    if (index !== -1) {
        ordersArray.splice(index, 1);
        lineDetails.innerHTML = ordersArray.map(order => renderLineItem(order)).join('');
        updateTotal();
    }
}

function renderAddedItem(item) {
    ordersArray.push(item); // Push item object to ordersArray
    lineDetails.innerHTML = ordersArray.map(order => renderLineItem(order)).join('');
}

function renderLineItem(item) {
    return `
        <div id='${item.id}' class='line-details'>
            <p class='line-title'>${item.name}</p>
            <p class='line-price'>£${item.price}</p>
            <button id='remove-btn' data-remove='${item.id}'>Remove</button>
        </div>`;
}

function updateTotal() {
    const total = ordersArray.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = `£${total.toFixed(2)}`; // Update total amount displayed
}

completeBtn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
});

exitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    closeModal();
});

payBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (formCvv.value === '') {
        // do nothing
    } else {
        closeModal();
        lineDetails.innerHTML = updateCustomer();
    }
});

function openModal() {
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.toggle('hidden');
}

function sanitizeInput(input) {
    console.log('User tried to inject HTML');
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}

function updateCustomer() {
    let userName = sanitizeInput(formName.value);
    completeBtn.style.display = 'none';
    return `
        <p id='complete-message'>Your order is on its way! Thanks, ${userName}!</p>
    `;
}