
import {
    getGameState,
    startGame,
    duel,
    computerPlay,
    addScore,
    removeCard,
    nextDuel,
    nextRound
} from "./game.js";

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

let duelInProgress = false;

// Update information
function updateInformation() {
    const state = getGameState();

    playerScoreElement.textContent = state.playerScore;
    computerScoreElement.textContent = state.computerScore;

    roundElement.textContent = state.currentRound;
    groupElement.textContent = Math.ceil(state.currentRound / 3);

    playerCampElement.textContent = state.playerCamp;

    firstPlayerElement.textContent =
        state.firstPlayer === state.playerCamp
            ? "Vous commencez"
            : "Ordinateur commence";
}

// Display cards
function displayCards() {
    const state = getGameState();

    playerCardsElement.innerHTML = "";
    computerCardsElement.innerHTML = "";

    state.playerCards.forEach((card, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.disabled = !state.gameStarted || duelInProgress;

        button.className = "cursor-pointer disabled:opacity-50";

        button.innerHTML = `
            <img
                src="${card.image}"
                alt="${card.name}"
                class="w-24 h-36 object-cover rounded-xl"
            >
        `;

        button.addEventListener("click", () => playDuel(index));

        playerCardsElement.appendChild(button);
    });

    state.computerCards.forEach(() => {
        const card = document.createElement("div");

        card.className =
            "w-24 h-36 bg-yellow-400 rounded-xl flex items-center justify-center text-blue-950 font-bold";

        card.textContent = "?";

        computerCardsElement.appendChild(card);
    });
}

// Display played cards
function displayPlayedCards(playerCard, computerCard) {
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
}

// End game
function endGame() {
    const state = getGameState();

    playerCardsElement.innerHTML = "";
    computerCardsElement.innerHTML = "";

    if (state.playerScore > state.computerScore) {
        resultElement.textContent =
            "Félicitations ! Vous avez gagné la partie.";
    } else if (state.computerScore > state.playerScore) {
        resultElement.textContent =
            "L'ordinateur a gagné la partie.";
    } else {
        resultElement.textContent = "Match nul !";
    }

    firstPlayerElement.textContent = "Partie terminée";
}

// Next round
function prepareNextRound() {
    nextRound();

    const state = getGameState();

    if (!state.gameStarted) {
        updateInformation();
        endGame();
        return;
    }

    playerPlayedCardElement.innerHTML = "";
    computerPlayedCardElement.innerHTML = "";

    resultElement.textContent = "Manche " + state.currentRound;

    updateInformation();
    displayCards();

    duelInProgress = false;
}

// Play duel
function playDuel(playerIndex) {
    if (duelInProgress) return;

    const state = getGameState();

    if (!state.gameStarted || state.playerCards.length === 0) {
        return;
    }

    if (playerIndex < 0 || playerIndex >= state.playerCards.length) {
        return;
    }

    duelInProgress = true;
    displayCards();

    const playerCard = state.playerCards[playerIndex];

    const computerIndex = computerPlay();
    const computerCard = state.computerCards[computerIndex];

    const result = duel(playerCard, computerCard);

    displayPlayedCards(playerCard, computerCard);

    // Remove played cards
    const newPlayerCards = removeCard(state.playerCards, playerIndex);
    const newComputerCards = removeCard(state.computerCards, computerIndex);

    // Note: game.js currently has no function to update hands.
    // The UI cannot replace the game state directly.
    resultElement.textContent =
        result === "égalité"
            ? "Égalité !"
            : result === "victoire"
                ? "Vous avez gagné le duel !"
                : "L'ordinateur a gagné le duel !";

    addScore(result);
    updateInformation();

    setTimeout(() => {
        if (result === "égalité") {
            nextDuel();
            duelInProgress = false;
            displayCards();
            return;
        }

        prepareNextRound();
    }, 1000);
}

// Start game
function handleStartGame() {
    startGame();

    duelInProgress = false;

    playerPlayedCardElement.innerHTML = "";
    computerPlayedCardElement.innerHTML = "";

    resultElement.textContent = "La partie commence !";

    updateInformation();
    displayCards();
}

// Initialize UI
function initUI() {
    if (!startGameButton) {
        console.error("Bouton startGame introuvable.");
        return;
    }

    startGameButton.addEventListener("click", handleStartGame);
}

export { initUI };
