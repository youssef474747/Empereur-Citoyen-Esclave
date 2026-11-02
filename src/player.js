let playerForm =document.getElementById("playerForm");
let pseudoInput =document.getElementById("pseudo");
let playersList = document.getElementById("playersList");
let playersCount = document.getElementById("playersCount");
let errorMessage = document.getElementById("errorMessage");
let existingMessage = document.getElementById("existingMessage");
let players =[];
let editingPlayer = null ;

playerForm.addEventListener("submit",function(event){
    event.preventDefault();
    console.log("form submitted");
    
let pseudo = pseudoInput.value.trim();
let regex =/^[a-zA-Z0-9]+$/ ;
if(pseudo.length <16 && pseudo.length >2 && regex.test(pseudo)){
    console.log("pseudo valide");
    errorMessage.textContent="";
}else{
    console.log("pseudo invalide");
    errorMessage.textContent="Le pseudo doit contenir entre 3 et 15 caractères."
    return;
}
let exitingPlayer = players.find(function(player){
    return player.pseudo.toLowerCase() === pseudo.toLowerCase()
        && player !== editingPlayer;
});
if(exitingPlayer){
    existingMessage.textContent = "ce pseudo existe déja";
    return ;
}else{
    existingMessage.textContent ="";
}


// avatar select
let selectedAvatar = document.querySelector('input[name="avatar"]:checked');

if(!selectedAvatar){
    errorMessage.textContent ="Veuillez choisir un avatar";
    return;
}
let avatar =selectedAvatar.value ; 
console.log("avatar choisi :",avatar);


// creation de joueur
let player;

if (editingPlayer === null) {

    // Ajouter un nouveau joueur
    player = {
        pseudo: pseudo,
        avatar: avatar
    };

    players.push(player);

} else {

    // Modifier le joueur existant
    editingPlayer.pseudo = pseudo;
    editingPlayer.avatar = avatar;

    player = editingPlayer;
}
// afficher le joueur

let playerElement = document.createElement("div");
playerElement.className ="bg-white p-5 rounded-xl shadow-md flex items-center gap-4"
let avatarElement = document.createElement("img");

avatarElement.src = player.avatar;
avatarElement.alt = "Avatar";
avatarElement.className ="w-16 h-16 rounded-full object-cover"

 let pseudoElement = document.createElement("p");

// SUPPRIMER
let deleteButton = document.createElement("button");
deleteButton.textContent = "supprimer";
deleteButton.className =  "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer";
deleteButton.addEventListener("click", function() {

    players = players.filter(function(item) {
        return item.pseudo !== player.pseudo;
    });

    playerElement.remove();

    playersCount.textContent = players.length + " joueurs";
});

// AFFICHER LE JOUEUR
pseudoElement.textContent = player.pseudo;
pseudoElement.className = "font-bold text-lg text-blue-950";

playerElement.appendChild(avatarElement);
playerElement.appendChild(pseudoElement);
playerElement.appendChild(deleteButton);

playersList.appendChild(playerElement);

playersCount.textContent = players.length + " joueurs";
playerForm.reset();

// modifie

let editButton = document.createElement("button")
editButton.textContent ="Modifier";
editButton.className ="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer";
editButton.addEventListener("click",function(){
    editingPlayer = player ;
    pseudoInput.value = player.pseudo ;
    let avatarRadio = document.querySelector(
        `input[name="avatar"][value="${player.avatar}"]`
    );
    if(avatarRadio){
        avatarRadio.checked = true ;
    }
   
})
 playerElement.appendChild(editButton);
});