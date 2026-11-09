
const cards = [
    { name: "Empereur", image: "./images/king.jpg" },
    { name: "Citoyen", image: "./images/citoyen.jpg" },
    { name: "Esclave", image: "./images/slave.jpg" },
];

// État du jeu
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

let computerChoice = null;

// Créer les cartes d'un camp
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

// Vérifier le résultat du duel
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

// Choisir une carte aléatoire
function computerPlay() {
    return Math.floor(Math.random() * computerCards.length);
}

// Démarrer une nouvelle partie
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

    computerChoice = null;
}

// Changer les camps après chaque groupe de 3 manches
function changeCamps() {
    playerCamp = playerCamp === "Empereur"
        ? "Esclave"
        : "Empereur";

    computerCamp = computerCamp === "Empereur"
        ? "Esclave"
        : "Empereur";
}

// Préparer la manche suivante
function nextRound() {
    currentRound++;

    if (currentRound > 12) {
        gameStarted = false;
        duelLocked = true;
        return;
    }

    if ((currentRound - 1) % 3 === 0) {
        changeCamps();
    }

    playerCards = createHand(playerCamp);
    computerCards = createHand(computerCamp);

    currentDuel = 1;
    computerChoice = null;

    firstPlayer = "Empereur";
}

// Ajouter les points du gagnant
function addScore(result) {
    if (result === "victoire") {
        playerScore += playerCamp === "Empereur" ? 1 : 5;
    } else if (result === "défaite") {
        computerScore += computerCamp === "Empereur" ? 1 : 5;
    }
}

// Retirer une carte de la main
function removeCard(hand, index) {
    return hand.filter((card, i) => i !== index);
}

// Préparer le duel suivant après une égalité
function nextDuel() {
    currentDuel++;

    firstPlayer = firstPlayer === "Empereur"
        ? "Esclave"
        : "Empereur";

    computerChoice = null;
    duelLocked = false;
}

// Déterminer le gagnant final
function getGameResult() {
    if (playerScore > computerScore) {
        return "victoire";
    }

    if (computerScore > playerScore) {
        return "défaite";
    }

    return "égalité";
}

// Récupérer l'état actuel du jeu
function getGameState() {
    return {
        playerCards,
        computerCards,
        playerScore,
        computerScore,
        currentRound,
        currentDuel,
        playerCamp,
        computerCamp,
        firstPlayer,
        gameStarted,
        duelLocked,
        computerChoice
    };
}
// Exporter les fonctions et les données
export {
    cards,
    createHand,
    duel,
    computerPlay,
    startGame,
    changeCamps,
    nextRound,
    addScore,
    removeCard,
    nextDuel,
    getGameResult,
    getGameState
};