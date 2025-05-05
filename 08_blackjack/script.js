let player = {
    name: "You",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let score = player.chips;
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let startContinueButton = document.getElementById("start-continue")

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true;
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Your Hand: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = sum
    if (sum <= 20) {
        message = "Do you want to draw a new card? Press NEW CARD."
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        score += 10;
        hasBlackJack = false
    } else {
        message = "You lost 10 chips!"
        isAlive = false
        score -= 10;
        startContinueButton.textContent = 'CONTINUE';
    }
    messageEl.textContent = message;

    if (score > 0) {
        playerEl.textContent = `${player.name} have: ${score} chips left.`;
    } else if (score === 0) {
        playerEl.textContent = `Game over, click START GAME to try again.`;
        score = player.chips;
        startContinueButton.textContent = 'START GAME';
    } else {
        console.log('Error, score is less than 0, something is wrong.')
    }
}

function newCard() {
    if (isAlive === true && sum != 21) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}
