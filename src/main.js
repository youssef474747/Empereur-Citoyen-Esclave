import "./game.js";

const cards = [
    { name: "Empereur", image: "./images/king.jpg" },
    { name: "Citoyen", image: "./images/citoyen.jpg" },
    { name: "Esclave", image: "./images/slave.jpg" },
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

let computerChoice = null ; 

const playerCardsElement =document.getElementById("playerCards");
const computerCardsElement =document.getElementById("computerCards");
const playerScoreElement =document.getElementById("playerScore");
const computerScoreElement =document.getElementById("ordinateurScore");
const playerPlayedCardElement =document.getElementById("playerPlayedCards");
const computerPlayedCardElement =document.getElementById("computerPlayedCard");
const resultElement = document.getElementById("result"); 
const startGameButton =document.getElementById("startGame");
const roundElement = document.getElementById("round");
const groupElement = document.getElementById("group");
const playerCampElement = document.getElementById("playerCamp");
const firstPlayerElement = document.getElementById("firstPlayer");

// creat Game
function creatHand(camp){
    const citoyen = cards.find(card => card.name === "Citoyen");
    const spicialCard = cards.find(card => card.name === camp);
    return[citoyen ,citoyen , citoyen ,citoyen ,spicialCard];
}

// duel ruls

function duel(playerCard , computerCard){
    if(playerCard.name === computerCard.name){
        return "égalité"

    }
    if(
        (playerCard.name === "Empereur" && computerCard.name === "Citoyen") ||
        (playerCard.name === "Empereur" && computerCard.name === "Esclave") ||
        (playerCard.name === "Citoyen" && computerCard.name === "Esclave")
    ){
        return "victoire";
    }
    "défaite";
}
// computer play
function computerPlay(){
    return Math.floor(Math.random() * computerCards.length);

}
