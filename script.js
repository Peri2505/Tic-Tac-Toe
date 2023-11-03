const cellElements = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".resetBtn");
const winnerMessage = document.querySelector(".winner");
const whoIsPlaying = document.querySelector(".turn");
const showWhoWon = document.querySelector(".winnerMessage");

let gameOver = false;

const playerX = "x";
const playerO = "O";

const playerXState = [];
const playerOState = [];

let whoPlays = true;

const combinationsToWin = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playing(index) {
  if (cellElements[index].innerHTML !== "" || gameOver) {
    return;
  }
  cellElements[index].innerText = whoPlays ? playerX : playerO;
  if (whoPlays) {
    playerXState.push(index);
  } else {
    playerOState.push(index);
  }
  checkWinner();
  whoPlays = !whoPlays;
}
function checkWinner() {
  for (let index = 0; index < combinationsToWin.length; index++) {
    if (whoPlays) {
      let counter = 0;
      for (let i = 0; i < playerXState.length; i++) {
        if (combinationsToWin[index].indexOf(playerXState[i]) >= 0) {
          counter++;
        }
        if (counter === 3) {
          winnerMessage.classList.remove("winner");
          showWhoWon.innerText = "The Winner is X";
          gameOver = true;
        }
      }
    } else {
      let counter = 0;
      for (let i = 0; i < playerOState.length; i++) {
        if (combinationsToWin[index].indexOf(playerOState[i]) >= 0) {
          counter++;
        }
        if (counter === 3) {
          winnerMessage.classList.remove("winner");
          showWhoWon.innerText = "The Winner is O";
          // playerOState.length = 0;
          // playerXState.length = 0;
          gameOver = true;
        }
      }
    }
  }
}

cellElements.forEach((cell, index) => {
  cell.addEventListener("click", () => playing(index));
});

resetButton.addEventListener("click", resetBtnFunction);

function resetBtnFunction() {
  for (let index = 0; index < cellElements.length; index++) {
    cellElements[index].innerText = "";
    // winnerMessage.classList.add("winner");
    // // playerXState.length = 0;
    // // playerOState.length = 0;
    // gameOver = false;
    // whoPlays = true;
  }
  winnerMessage.classList.add("winner");
  playerXState.length = 0;
  playerOState.length = 0;
  gameOver = false;
  whoPlays = true;
}
