export function savePlayers(){
    localStorage.setItem("players",JSON.stringify(players));
}
function loadPlayers(){
    let savedPlayers = localStorage.getItem("players");
    if(savedPlayers === null){
        return [];
    }

    return JSON.parse(savedPlayers);
}