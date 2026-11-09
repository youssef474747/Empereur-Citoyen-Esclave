
import { initUI } from "./ui.js";

initUI();


const cards = [
    {
        name: "Empereur",
        image: "./images/king.jpg",
    },
    {
        name: "Citoyen",
        image: "./images/citoyen.jpg",
    },
    {
        name: "Esclave",
        image: "./images/slave.jpg",
    },
];

let playerCards = [];
let computerCards = [];

let playerScore = 0;
let computerScore = 0;

let currentRound = 1;
let currentDuel = 1;

let playerCamp = "Empereur";
let computerCamp = "Esclave";

let firstPlayer = "Empereur";

let gameStarted = false;
let duelLocked = false;

// HTML elements
const playerCardsElement = document.getElementById("playerCards");
const computerCardsElement = document.getElementById("computerCards");

const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("ordinateurScore");

const playerPlayedCardElement = document.getElementById("playerPlayedCard");
const computerPlayedCardElement = document.getElementById("computerPlayedCard");

const resultElement = document.getElementById("result");
const startGameButton = document.getElementById("startGame");

const roundElement = document.getElementById("round");
const groupElement = document.getElementById("group");
const playerCampElement = document.getElementById("playerCamp");
const firstPlayerElement = document.getElementById("firstPlayer");

// CREATE HAND
function createHand(camp) {
    const citoyen = cards.find(card => card.name === "Citoyen");
    const specialCard = cards.find(card => card.name === camp);

    return [
        citoyen,
        citoyen,
        citoyen,
        citoyen,
        specialCard
    ];
}

// DUEL RULES
function duel(playerCard, computerCard) {
    if (playerCard.name === computerCard.name) {
        return "égalité";
    }

    if (
        (playerCard.name === "Empereur" && computerCard.name === "Citoyen") ||
        (playerCard.name === "Citoyen" && computerCard.name === "Esclave") ||
        (playerCard.name === "Esclave" && computerCard.name === "Empereur")
    ) {
        return "victoire";
    }

    return "défaite";
}

// COMPUTER PLAY
function computerPlay() {
    return Math.floor(Math.random() * computerCards.length);
}

// UPDATE FIRST PLAYER
function updateFirstPlayer() {
    if (firstPlayerElement) {
        firstPlayerElement.textContent =
            firstPlayer === playerCamp
                ? "Vous commencez"
                : "Ordinateur commence";
    }
}

// UPDATE INFORMATION
function updateInformation() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;

    if (roundElement) {
        roundElement.textContent = currentRound;
    }

    if (groupElement) {
        groupElement.textContent = Math.ceil(currentRound / 3);
    }

    if (playerCampElement) {
        playerCampElement.textContent = playerCamp;
    }

    updateFirstPlayer();
}

// DISPLAY CARDS
function displayCards() {
    playerCardsElement.innerHTML = "";
    computerCardsElement.innerHTML = "";

    playerCards.forEach((card, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.disabled = duelLocked || !gameStarted;

        button.innerHTML = `
            <img
                src="${card.image}"
                alt="${card.name}"
                class="w-24 h-36 object-cover rounded-xl"
            >
        `;

        button.addEventListener("click", () => {
            playDuel(index);
        });

        playerCardsElement.appendChild(button);
    });

    computerCards.forEach(() => {
        const card = document.createElement("div");

        card.className = "w-24 h-36 bg-yellow-400 rounded-xl flex items-center justify-center text-blue-950 font-bold";

        card.textContent = "?";

        computerCardsElement.appendChild(card);
    });
}

// END GAME
function endGame() {
    gameStarted = false;
    duelLocked = true;

    playerCardsElement.innerHTML = "";
    computerCardsElement.innerHTML = "";

    if (playerScore > computerScore) {
        resultElement.textContent =
            "Félicitations ! Vous avez gagné la partie.";
    } else if (computerScore > playerScore) {
        resultElement.textContent =
            "L'ordinateur a gagné la partie.";
    } else {
        resultElement.textContent = "Match nul !";
    }

    if (firstPlayerElement) {
        firstPlayerElement.textContent = "Partie terminée";
    }
}

// NEXT ROUND
function nextRound() {
    currentRound++;

    if (currentRound > 12) {
        endGame();
        return;
    }

    // Change camps after rounds 3, 6 and 9
    if ((currentRound - 1) % 3 === 0) {
        playerCamp =
            playerCamp === "Empereur" ? "Esclave" : "Empereur";

        computerCamp =
            computerCamp === "Empereur" ? "Esclave" : "Empereur";
    }

    playerCards = createHand(playerCamp);
    computerCards = createHand(computerCamp);

    currentDuel = 1;
    firstPlayer = "Empereur";

    playerPlayedCardElement.innerHTML = "";
    computerPlayedCardElement.innerHTML = "";

    resultElement.textContent = "Manche " + currentRound;

    updateInformation();
    displayCards();
}

// PLAY DUEL
function playDuel(playerIndex) {
    if (!gameStarted || duelLocked) return;

    if (
        playerIndex < 0 ||
        playerIndex >= playerCards.length ||
        computerCards.length === 0
    ) {
        return;
    }

    duelLocked = true;
    displayCards();

    const playerCard = playerCards[playerIndex];
    const computerIndex = computerPlay();
    const computerCard = computerCards[computerIndex];

    const result = duel(playerCard, computerCard);

    playerPlayedCardElement.innerHTML = `
        <img
            src="${playerCard.image}"
            alt="${playerCard.name}"
            class="w-full h-full object-cover rounded-xl"
        >
    `;

    computerPlayedCardElement.innerHTML = `
        <img
            src="${computerCard.image}"
            alt="${computerCard.name}"
            class="w-full h-full object-cover rounded-xl"
        >
    `;

    // Remove played cards using new arrays
    playerCards = playerCards.filter(
        (card, index) => index !== playerIndex
    );

    computerCards = computerCards.filter(
        (card, index) => index !== computerIndex
    );

    if (result === "égalité") {
        resultElement.textContent = "Égalité ! Rejouez.";

        if (playerCards.length === 0) {
            resultElement.textContent =
                "Manche terminée : égalité !";

            setTimeout(() => {
                nextRound();

                if (gameStarted) {
                    duelLocked = false;
                    displayCards();
                }
            }, 1000);

            return;
        }

        setTimeout(() => {
            currentDuel++;

            firstPlayer =
                firstPlayer === "Empereur" ? "Esclave" : "Empereur";

            duelLocked = false;

            updateInformation();
            displayCards();
        }, 1000);

        return;
    }

    // Award points once when the round ends
    if (result === "victoire") {
        playerScore += playerCamp === "Empereur" ? 1 : 5;

        resultElement.textContent =
            "Vous avez gagné la manche !";
    } else {
        computerScore += computerCamp === "Empereur" ? 1 : 5;

        resultElement.textContent =
            "L'ordinateur a gagné la manche !";
    }

    updateInformation();

    setTimeout(() => {
        nextRound();

        if (gameStarted) {
            duelLocked = false;
            displayCards();
        }
    }, 1000);
}

// START GAME
function startGame() {
    playerCamp = "Empereur";
    computerCamp = "Esclave";

    playerCards = createHand(playerCamp);
    computerCards = createHand(computerCamp);

    playerScore = 0;
    computerScore = 0;

    currentRound = 1;
    currentDuel = 1;

    firstPlayer = "Empereur";

    gameStarted = true;
    duelLocked = false;

    playerPlayedCardElement.innerHTML = "";
    computerPlayedCardElement.innerHTML = "";

    resultElement.textContent = "La partie commence !";

    updateInformation();
    displayCards();
}

// BUTTON EVENT
if (startGameButton) {
    startGameButton.addEventListener("click", startGame);
}
