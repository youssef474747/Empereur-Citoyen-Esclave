const cards =[
    {
        name :"Empereur",
        image :"./images/king.jpg",
    },
    {
        name :"Citoyen",
        image :"./images/citoyen.jpg",
    },
    {
        name :"Esclave",
        image :"./images/slave.jpg",
    },
]

let playerCards = [];
let computerCards = [];
let playerScore = 0;
let computerScore =0 ;
let currentRound =1 ;
let courrentDuel =1 ;
let playerCamp ="Empereur" ;

const playerCardElement =document.getElementById("playerCard");
const computerCardElement = document.getElementById("computerCards");
const playerScoreElement = document.getElementById("playerScore");
const computerScoreElement = document.getElementById("ordinateurScore");
const playerPlayedCardElement =document.getElementById("playerPlayedCard");
const resultElement =document.getElementById("result");
const startGameButton = document.getElementById("startGame");

// creat hand

function createHand(camp){
    let hand =[];
    let citoyen =cards.find(card => card.name === citoyen);
    for(let i = 0; i < 4 ; i++){
        hand.push(citoyen) ;
    }
        let specialCard = cards.find(card => card.name === camp)
        hand.push(specialCard); 
        return hand;
    }

    playerCards = createHand(playerCamp);
    computerCards =createHand("Esclave");

    // duel
    function duel(playerCard ,computerCard){
        if(playerCard.name === computerCard){
            return "Egalité";
        }
        if((playerCard === "Citoyen" && computerCard ==="Esclave") ||
           ( playerCard ==="Esclave" && computerCard === "Empereur") ||
             (playerCard ==="Empereur" && computerCard === "Citoyen")){
                return "Victoire";
             }
             return "defaite"
    }

    // COMPUTER 

    function computerPlay() {
        let randomIndex = Math.floor(Math.random() * computerCards.length);
        let computerCard = computerCards[randomIndex];
        return computerCard ;
    }

    // display cards
    
    function displayCards(){

    playerCardsElement.innerHTML = "";
    computerCardsElement.innerHTML = "";

    playerCards.forEach((card, index) => {
        let button = document.createElement("button");
         button.innerHTML = `
            <img src="${card.image}"
                 alt="${card.name}"
                 class="w-24 h-36 object-cover rounded-xl">
        `;
        button.addEventListener("click" ,function(){
            playDuel(index);
        });
        playerCardsElement.appendChild(button);
    });
    computerCards.forEach(() => {
        let card = document.createElement("div");
        card.className ="w-24 h-36 bg-yellow-400 rounded-xl flex item-center justify-center text-blue-950 font-bold"
        card.textContent ="?"
        computerCardsElement.appendChild(card);
    });
    if(playerCards.length === 0 || computerCards.length === 0){
        return ;
    }
    let playerCard = playerCards[playerIndex];
    let computerCard = computerPlay();
    let result = duel(playerCard , computerCard);
    if(result === "Victoire"){
        playerScore++ ;
    }else if(result === "Defaite"){
        computerScore++ ;

    }
    let computerIndex = computerCards.indexOf(computerCard);
    playerCards.splice(playerIndexToRemove ,1);
    playerScoreElement.textContent = playerScore ;
    computerScoreElement.textContent = computerScore ;
    playerPlayedCardElement.innerHTML =`
    <img src  "${playerCard.image}"
    class ="w-full h-full object-cover rounded-xl" >`;
    computerPlayedCardElement.innerHTML =`
    <img src ="${computerCard.image}"
    class ="w-full h-full object-cover rounded-xl" >`;
    resultElement.textContent = result ;
    courrentDuel++ ;
    displayCards();

    }

    // START GAME

    function startGame(){
        playerCards = createHand(playerCamp);
        computerCards = createHand("Esclave");
        playerScore = 0 ;
        computerScore = 0;
        courrentDuel = 1;
        playerScoreElement.textContent = playerScore ;
        computerScoreElement.textContent = computerScore ;
        resultElement.textContent ="";
        displplay();
    }
 
    