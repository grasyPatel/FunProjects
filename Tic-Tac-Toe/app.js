const cells=document.querySelectorAll(".cell");
const playerTurnX=document.querySelector(".turn.X");
const playerTurnY=document.querySelector(".turn.O");
const WinnerDisplay=document.querySelector(".winner_display");
const restartBtn=document.querySelector("restart");

let board=["","","","","","","","",""];
let currentPlayer="X";
let isGameActive=true;

const winningBorad=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const updateTurn=()=>{
    playerTurnX.classList.toggle('active',currentPlayer==='X');
    playerTurnY.classList.toggle('active',currentPlayer==='O');

};

const checkWinner=()=>{
    for(let condition of winningBorad){
        const[a,b,c]=condition;
        if(board[a] && board[a]===board[b] && board[b]===board[c]){
            isGameActive=false;
            WinnerDisplay.textContent=`${currentPlayer} Wins!`;
            return true;
        }
    }
    if(!board.includes("")){
        isGameActive=false;
        
        WinnerDisplay.textContent=`Its a Draw!`;
        return true;
    }
    return false;
};

const handleClick=(e)=>{
    const cell=e.target;
    const index=cell.dataset.index;

    if(board[index]!=="" || !isGameActive){
        return ;
    }

    board[index]=currentPlayer;
    cell.textContent=currentPlayer;
    cell.classList.add("taken");
    cell.classList.add("colorchange");


    if(!checkWinner()){
        currentPlayer=currentPlayer==="X"?"O":"X";
        updateTurn();
    }
}
// const restartGame=()=>{

// }

cells.forEach(cell=> cell.addEventListener('click', handleClick));
//restartBtn.addEventListener('click',restartGame);

updateTurn();