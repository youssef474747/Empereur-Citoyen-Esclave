export function savePlayers(players){
    localStorage.setItem("players",JSON.stringify(players));
}
export function loadPlayers(){
    let savedPlayers = localStorage.getItem("players");
    if(savedPlayers === null){
        return [];
    }

    return JSON.parse(savedPlayers);
}
export function clearPlayers(){
    localStorage.removeItem("players");
}