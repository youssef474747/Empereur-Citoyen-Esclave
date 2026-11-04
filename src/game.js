const cards =[
    {
        name :"Empereur",
        image :"images/empereur.png",
    },
    {
        name :"Citoyen",
        image :"images/citoyen.png",
    },
    {
        name :"Esclave",
        image :"images/Esclave.png",
    },
]

let playerCards = [];
let computerCards = [];
let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
let currentDuel = 1;
let playerCamp = "Empereur";

function createHand(camp){
    let hand = [];
    let citoyen = cards.find(cards=> cards.name === "Citoyen");
    for (let i = 0; i < 4; i++) {
        hand.push(citoyen);
}
   let specialCard = cards.find(card => card.name === camp);
        hand.push(specialCard);
        return hand;
}
 playerCards = createHand(playerCamp);
computerCards = createHand("Esclave");