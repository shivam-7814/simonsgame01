
// Initializations 
let body = document.querySelector("body");
let btn = document.querySelector(".btn");
let strt = document.querySelector("#startgame");
let reset = document.querySelector("#resetgame");
let displayHighScore = document.querySelector("p");


let gameSeq = [];
let userSeq = [];

let gameStart = false;
let lvl = 0;
let highScore = localStorage.getItem("highScore") || 0;
let h2 = document.querySelector('h2');
let topper = localStorage.getItem("topper")|| "Shivam";

let btns = ["yellow", "red","purple","green"];



strt.addEventListener("click", function(){
   if(gameStart==false){
       gameStart = true;
       strt.style.display = 'none';
       lvlUp();
   }
  
})

function lvlUp(){
   userSeq = [];
   lvl++;
   h2.innerText = `Level : ${lvl}`;
   let randIndx = Math.floor(Math.random()*4);
   let randColor = btns[randIndx];
   let btn = document.querySelector(`.${randColor}`);
   
   // console.log(btn);
   // console.log(randIndx);
   // console.log(randColor);
   gameSeq.push(randColor);
   gameFlash(btn);
}

function gameFlash(btn){
   btn.classList.add("flash");
   
   setTimeout(function(){
      btn.classList.remove("flash");
   },150);

}
function userFlash(btn){
    
   btn.classList.add("userflash");
   setTimeout(function(){
      btn.classList.remove("userflash");
   },150);
}

function btnPress(){
      let btn = this;
      userFlash(btn);

      let userColor = btn.getAttribute('id');
      userSeq.push(userColor);
      checkAns(userSeq.length-1);
}


function checkAns(idx){
   
   if(userSeq[idx]==gameSeq[idx]){
    
      if(userSeq.length==gameSeq.length){
         setTimeout(lvlUp,1000);
      }

   } else{
        h2.innerText =`Game Over Your Score ${lvl}`;
       let body =   document.querySelector("body");
       body.style.backgroundColor = "red";
       body.style.color = "white";
       strt.style.display = "none";
       reset.style.display = "block"
       if (lvl > highScore) {
            highScore = lvl;
            topper = prompt("You Made Highest Score Write Your Name");
            localStorage.setItem("topper", topper);
            localStorage.setItem("highScore", highScore);
         }
       displayHighScore.style.display ="block";
       displayHighScore.innerText = `${topper} did higest Score  ${highScore}`;
       
   }

}


let allBtn = document.querySelectorAll(".btn");
   for(btn of allBtn){
      btn.addEventListener("click",btnPress);
   }


   function resetGame(){
      // gameStart = true;
      // let gameSeq = [];
      // let userSeq = [];
      // lvl = 0;
      window.location.reload();

   }
reset.addEventListener("click",function(){
   setTimeout(resetGame,500);

})