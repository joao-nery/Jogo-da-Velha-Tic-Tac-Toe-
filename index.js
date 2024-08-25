const gameDisplay = document.querySelector('.game-display');
const gameBtns = document.querySelectorAll('.btn');
let player = 'X';
let selected;
const positions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

function init(){
    selected = [];
    gameDisplay.innerHTML = `Jogador da Vez: ${player}`;

    gameBtns.forEach((el) => {
        el.innerHTML = '';
        el.addEventListener('click', newMove)
    })
}

init();

function newMove(e){
   const index = e.target.getAttribute('data-action');
   e.target.textContent = player;
   e.target.removeEventListener('click', newMove);
   selected[index] = player;

   setTimeout(() => {
    check()
   }, 100);

   player = player == 'X' ? 'O' : 'X';
   gameDisplay.innerHTML = `Jogador da Vez: ${player}`;
};

function check(){
    let playerLastMove = player == 'X' ? 'O' : 'X';

    const filter = selected.map((el, i) => [el, i])
    .filter((el) => el[0] === playerLastMove)
    .map((el) => el[1]);

    for(keys of positions){
        if(keys.every((el) => filter.includes(el))){
            alert(`jogador ${playerLastMove} ganhou`);
            return init();
        }
    }

    if(selected.filter((el) => el).length === 9){
        alert('Deu Velha!');
        return init();
    }
    
}

