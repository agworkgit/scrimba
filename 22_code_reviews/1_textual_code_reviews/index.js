/* 

Code review guide

• Understand the code
• Functionality
• Code formatting
• Consistency
• Simplicity
• Unused code
• Duplicate code
• Potential edge cases
• Praise your peers 

*/

/* Challenge: Give a textual code review.
Provide feedback using code comments. */

/* Let's pay closer attention to
code indentation and semicolon consistency */

/* Function name would be more readable in camelCase: getDiscount */
function getdiscount(code) {
    /* Convert the value of code to uppercase before
    finding a matching promo code */

    /* Declare promo with const to prevent reassignment */
    let promo = promos.find(promo => promo.code === code);
    console.log(promo); // Do not include in production code

    /* Make this condition more concise without the !== comparison;
    only check if promo is truthy and active: promo && promo.isActive */
    if (promo !== undefined && promo.isActive) {
        // Consider leaving out of production code
        console.log(`You get a ${promo.amount}% discount!`);
        return promo.amount / 100;
    }
    return 0;
}

/* Function name would be more readable in camelCase: calculateFinalPrice */
function calculatefinalprice(basePrice, userCode) {
    /* Similar to getDiscount, consider omitting the else block and
    returning basePrice if the condition is false */
    if (userCode) {
        const discount = getdiscount(userCode);
        const finalPrice = basePrice - basePrice * discount;
        return finalPrice;
    } else {
        return basePrice;
    }
}

/* Move this array to the top of the file 
for better code organization */
const promos = [
    { code: 'TOTALLY10', amount: 10, isActive: true },
    { code: 'PLENTY20', amount: 20, isActive: false },
    { code: 'NIFTY50', amount: 50, isActive: true },
    { code: 'WHOPPING75', amount: 75, isActive: true },
    { code: 'YOLOFREE', amount: 100, isActive: false },
];

// console.log(calculatefinalprice(500, 'Nifty50'));
console.log(calculatefinalprice(1000, 'YoloFree'));