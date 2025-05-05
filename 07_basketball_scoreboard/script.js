// Variables for home add point buttons

let onePointHome = document.querySelector('#digit1add1');
let twoPointsHome = document.querySelector('#digit1add2');
let threePointsHome = document.querySelector('#digit1add3');

// Variables for home add point buttons

let onePointGuests = document.querySelector('#digit2add1');
let twoPointsGuests = document.querySelector('#digit2add2');
let threePointsGuests = document.querySelector('#digit2add3');

// Variables for the score digits

let homeDigit = document.querySelector('#digit1');
let guestsDigit = document.querySelector('#digit2');

// Variable to keep track of the score

let homeScore = 0;
let guestsScore = 0;

// Variable for new game

let newGame = document.querySelector('#new-game');

// Variables for leader

let leaderText = 'LEADER';
let tieText = 'TIE';
let leaderTargetHome = document.querySelector('#leader-text1');
let leaderTargetGuests = document.querySelector('#leader-text2');

// Conditional to render current leader

function updateLeader(score1, score2) {
    // leaderTargetHome.textContent = leaderText;
    // leaderTargetGuests.textContent = leaderText;

    if (score1 > score2) {
        leaderTargetGuests.textContent = '';
        leaderTargetHome.textContent = leaderText;
    } else if (score2 > score1) {
        leaderTargetHome.textContent = '';
        leaderTargetGuests.textContent = leaderText;
    } else {
        leaderTargetHome.textContent = tieText;
        leaderTargetGuests.textContent = tieText;
    }
}

// Function to add points home when buttons are clicked

function addPointsHome() {
    onePointHome.addEventListener('click', function () {
        homeScore += 1;
        homeDigit.textContent = homeScore;
        updateLeader(homeScore, guestsScore);
    });

    twoPointsHome.addEventListener('click', function () {
        homeScore += 2;
        homeDigit.textContent = homeScore;
        updateLeader(homeScore, guestsScore);
    });

    threePointsHome.addEventListener('click', function () {
        homeScore += 3;
        homeDigit.textContent = homeScore;
        updateLeader(homeScore, guestsScore);
    });
}

addPointsHome();

// Function to add points guests when buttons are clicked

function addPointsGuests() {
    onePointGuests.addEventListener('click', function () {
        guestsScore += 1;
        guestsDigit.textContent = guestsScore;
        updateLeader(homeScore, guestsScore);
    });

    twoPointsGuests.addEventListener('click', function () {
        guestsScore += 2;
        guestsDigit.textContent = guestsScore;
        updateLeader(homeScore, guestsScore);
    });

    threePointsGuests.addEventListener('click', function () {
        guestsScore += 3;
        guestsDigit.textContent = guestsScore;
        updateLeader(homeScore, guestsScore);
    });

}

addPointsGuests();

// Function for new game

function startNewGame() {
    newGame.addEventListener('click', function () {
        homeScore = 0;
        guestsScore = 0;
        homeDigit.textContent = homeScore;
        guestsDigit.textContent = guestsScore;
        updateLeader(homeScore, guestsScore);
    });
}

startNewGame();