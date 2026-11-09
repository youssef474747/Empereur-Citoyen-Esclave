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
