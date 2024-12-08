let gameSeg=[];
let userSeq=[];

let level=0;
let start=false;
let levelh2=document.querySelector("h3");

let btns=["red","yellow","green","purple"];

document.addEventListener("keypress", function(){
    if(start==false){
        start=true;
        console.log("Game Started.");


        levelup();
    }
});

function flashBtn(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },500);

}

function levelup(){
    userSeq=[];
    level++;

    levelh2.innerText=`Level: ${level}`;

    let renInd=Math.floor(Math.random()*4);
    let rendcolor=btns[renInd];
    let randbtn=document.querySelector(`.${rendcolor}`);
    gameSeg.push(rendcolor);

    flashBtn(randbtn);

}


let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn){
    btn.addEventListener("click", btnpress);
}

function btnpress(){
    let btn=this;
    flashBtn(btn);
    let usercolor= btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);

}
 function checkAns(index){
   
    if(userSeq[index]===gameSeg[index]){
        if(userSeq.length==gameSeg.length){
            setTimeout(levelup,1000);
        }

    }
    else{
        levelh2.innerHTML=`Game Over! Your Score : <b>${level}</b> </br>Press Any Key to start.`;
        document.querySelector("body").style.background="red";
        setTimeout(function(){
            document.querySelector("body").style.background="White"
            
        },250);
        reset();
    }
 }
let highestScore=0;
let h4=document.querySelector("h4");

 function reset(){
    start=false;
    gameSeg=[];
    userSeq=[];
   
    if(highestScore<level){
        h4.innerHTML=`Highest Score: <b>${level}</b>`;
        highestScore=level;
    }
    else{
        h4.innerHTML=`Highest Score: <b>${highestScore}</b>`

    }   
    level=0;
 }