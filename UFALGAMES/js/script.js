const bloco = document.querySelectorAll(".bloco");
const turnoX = document.querySelector("#turnoX");
const turnoO = document.querySelector("#turnoO");
const displayTurno = document.querySelector(".turno");
const displayGame = document.querySelector(".conteiner");
const popup = document.querySelector(".popup");
const winner = document.querySelector(".winner");

const possibilidades = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const playerX = 'X';
const playerO = 'O';

let playerChoose = true;
let switchBlock = true;
let endTurns = false
let playerEscolhido;
function playerChoosed (player){
    displayGame.style.display = "block";
    displayTurno.style.display = "flex";
    popup.style.display = "none";
    playerChoose = player;
    switchBlock = player;

    playerEscolhido = playerChoose ? playerX : playerO;

    displayTurn();
}


document.addEventListener("click", (event) => {
    if(event.target.matches(".bloco")){
        play(event.target.id, playerChoose);

        setTimeout(()=> bot(), 300);
    }
})

function play (playId, playerChoose){
    const bloco = document.getElementById(playId);
    let turno = playerChoose ? playerX : playerO;
    bloco.textContent = turno;
    bloco.style.pointerEvents = "none";

    if (playerChoose === true){
        bloco.style.color = "rgb(63, 0, 122)";
    }
    
    bloco.classList.add(turno);
    switchBlock = !switchBlock;

    isWinner (turno);
    

}

function bot (){
    const blocoDisponivel = [];

    for(i in bloco){
        if(!isNaN(i)){
            if (!bloco[i].classList.contains(playerX) && !bloco[i].classList.contains(playerO)){
                blocoDisponivel.push(i);
            }
        }
    }

    const jogadaAleatoria = Math.floor(Math.random() * blocoDisponivel.length);
    if(!endTurns){
        play(blocoDisponivel[jogadaAleatoria], !playerChoose);
    }
}

function isWinner (turno){
    const vencedor = possibilidades.some((possibilidade) =>{
        return possibilidade.every((index) =>{
            return bloco[index].classList.contains(turno);
        });
    });

    if (vencedor){
        endGame(turno);
    }else if (empate()){
        endGame();
    } else{
        displayTurn();
    }
}

function endGame (vencedor = null){
    endTurns = true;
    
    const h1 = document.createElement("h1");
    const spanX = document.createElement("span");
    const spanO = document.createElement("span");

    winner.style.display = "flex";
    displayGame.style.display = "none";
    displayTurno.style.display = "none";

    winner.appendChild(spanO);
    winner.appendChild(spanX);
    winner.appendChild(h1);

    let scoreP = JSON.parse(localStorage.getItem('playerScore') || "0");
    let scoreS = JSON.parse(localStorage.getItem('sistemaScore') || "0");
    
    if(vencedor){
        h1.innerHTML = `O jogador <span id="playerWinner">${vencedor}</span> foi o vencedor!`;

        if(vencedor === playerEscolhido){
            scoreP+=1;
            localStorage.setItem("playerScore", scoreP);
        }else{
            scoreS+=1;
            localStorage.setItem("sistemaScore", scoreS);
        }

        spanX.textContent = `HighScore Player: ${JSON.parse(localStorage.getItem('playerScore') || "0")}P`;
        spanO.textContent = `HighScore Sistema: ${JSON.parse(localStorage.getItem('sistemaScore') || "0")}P`;
    }else{
        h1.innerHTML = "Foi empate!";
    }
}

function empate(){
    let countX = 0;
    let countO = 0;

    for (i in bloco){
        if(!isNaN(i)){
            if (bloco[i].classList.contains(playerX)){
                countX++;
            }
            if (bloco[i].classList.contains(playerO)){
                countO++;
            }
        }
    }
    return countX + countO === 9? true : false;
}


function displayTurn (){
    if (switchBlock === true){
        turnoX.style.backgroundColor = "rgb(188, 117, 255)";
        turnoO.style.backgroundColor = "blueviolet";
    }else{
        turnoX.style.backgroundColor = "blueviolet";
        turnoO.style.backgroundColor = "rgb(188, 117, 255)";
    }
}

function reload (){
    location.reload();
}