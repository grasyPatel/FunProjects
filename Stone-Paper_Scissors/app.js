let counter=document.querySelector(".counter");

let start=false;
let level=0;
document.addEventListener("keypress",function(){
    if(start==false){
        start=true;
      
        counter.innerHTML=`Round: ${level}`;
        levelup();
    }

})


let choices=["Stone","Paper","Scissors"];


function getComputerChoice(){
    let index=Math.floor(Math.random()*3);
    return index
}

function levelup(){
    
    
    document.addEventListener('keydown',(event)=>{
    let playerChoice;
    if(event.key==='ArrowLeft') playerChoice=0;
    else if(event.key==='ArrowDown') playerChoice=1;
    else if(event.key==='ArrowRight') playerChoice=2;
    else request;
    const computerChoice=getComputerChoice();
    const result=determineWinner(playerChoice,computerChoice);
    updateUI(playerChoice,computerChoice,result);
})
};


function determineWinner(playerChoice,computerChoice){
    if(playerChoice===computerChoice) return 'draw';
    if(
        (playerChoice===0 && computerChoice===2)||
        (playerChoice===1 && computerChoice===0)||
        (playerChoice===2 && computerChoice===1) 
    ){
        return 'player';
    }
    return 'computer';
}
let cBox=document.querySelectorAll('.computer .box1');
let pBox=document.querySelectorAll('.user .box1');

let playerScore=document.querySelector('.Score-P');
let ComputerScore=document.querySelector('.Score-C')
let ps=0;
let cs=0;
function updateUI(playerChoice, computerChoice, result){
    level++;
    counter.innerHTML=`Round: ${level}`;
    cBox.forEach(box => box.classList.remove('active'));
    cBox[computerChoice].classList.add('active');
    pBox.forEach(box => box.classList.remove('active'));
    pBox[playerChoice].classList.add('active');

    if(result==='player'){
        ps++;
        playerScore.textContent=`Points: ${ps}`;
    }
    else if(result==='computer'){
        cs++;
        ComputerScore.textContent=`Points: ${cs}`;
    }

}
let endGame=document.querySelector("button");
endGame.addEventListener("click", function(){

    setTimeout(() => {
        if(ps>cs){
            counter.innerHTML=`Winner: Player with score - ${ps}`;
        }
        else{
            counter.innerHTML=`Winner: Computer with score - ${cs}`;
        }
        
    }, 100);
    document.querySelector("body").style.background="rgb(107, 203, 214)";
    setTimeout(function(){
        document.querySelector("body").style.background="white";
      

    },1000);
    setTimeout(() => {
        reset();
        
    }, 2000);

   
   
    

});

function reset(){
    start =false;
    counter.innerHTML="Press Any Key To Start."
    level=0;
    ps=0;
    cs=0;
    playerScore.textContent=`Points: ${ps}`;
    ComputerScore.textContent=`Points: ${cs}`;
    cBox.forEach(box => box.classList.remove('active'));
    pBox.forEach(box => box.classList.remove('active'));

}