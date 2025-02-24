let boxes = document.querySelectorAll('.box');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 =true;
let count =0;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame =()=>{
    turn0 = true;
    count =0;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach((box)=>{
        box.style.backgroundColor = "";
        box.style.color="";
    });
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){ //player 0
            box.innerText ="O";
            turn0 = false;
        }else{      //player X
            box.innerText ="X";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count ===9 && !isWinner){
            gameDraw();
        }

        // checkWinner();
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };

const disableBoxes =()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner =(winner)=>{
    msg.innerText =`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

checkWinner = () =>{
    for(pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
        if(pos1Val !="" && pos2Val !="" && pos3Val !=""){
            if(pos1Val === pos2Val && pos2Val === pos3Val && pos1Val !== ""){
                console.log("winner");
                boxes[pattern[0]].style.backgroundColor = "#5AAA95";
                boxes[pattern[1]].style.backgroundColor = "#5AAA95";
                boxes[pattern[2]].style.backgroundColor = "#5AAA95";
                boxes[pattern[1]].style.color = "#22181C";
                boxes[pattern[2]].style.color = "#22181C";
                boxes[pattern[0]].style.color = "#22181C";
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

newGameBtn.addEventListener("click",resetGame);