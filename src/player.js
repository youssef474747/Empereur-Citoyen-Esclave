let playerForm =document.getElementById("playerForm");
let pseudoInput =document.getElementById("pseudo");
let playersList = document.getElementById("playersList");
let playersCount = document.getElementById("playersCount");
let errorMessage = document.getElementById("errorMessage");
let players =[]

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

// avatar select
let selectedAvatar = document.querySelector('input[name="avatar"]:checked');

if(!selectedAvatar){
    errorMessage.textContent ="Veuillez choisir un avatar";
    return;
}
let avatar =selectedAvatar.value ; 
console.log("avatar choisi :",avatar);


// creation de joueur

let player ={
    pseudo : pseudo,
    avatar : avatar ,
};
console.log("Nouveu joueur :",player);

players.push(player);
console.log("Nouveau joueur :",player);
console.log("tout les joueurs :",players);
})
 