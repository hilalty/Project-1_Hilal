console.log("linked");
// CLASSES
class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  toString() {
    return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
  }
}

// VARIABLES
const squares = document.getElementsByClassName("square");
const board = document.getElementById("board");

const successEl = document.getElementById("successEl");
const failEl = document.getElementById("failEl");

let rowCountEl = document.getElementById("inputEl1");
let rowCount = 4;

let columnCountEl = document.getElementById("inputEl2");
let columnCount = 4;
const startButton = document.getElementById("startButton");

let differentSquareIndex;
let successCount = 0;
let failCount = 0;

// ASSIGNING COLOR
function resetBoard() {
  failEl.innerText = failCount;
  successEl.innerText = successCount;

  differentSquareIndex = getRandomInt(rowCount * columnCount);
  let selectedColorAll = getRandomColor();
  let selectedColorOne = getSimilarColor(selectedColorAll);
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = selectedColorAll.toString();
  }
  squares[differentSquareIndex].style.backgroundColor =
    selectedColorOne.toString();
    sec = 5;
}

function getSimilarColor(mainColor) {
  return new Color(mainColor.r + 30, mainColor.g + 30, mainColor.b + 30);
}

//START GAME
function startGame() {
  rowCount = parseInt(rowCountEl.value);
  columnCount = parseInt(columnCountEl.value);
  initializeTimer();
  createCells();
  resetBoard
();
}

let sec;
function initializeTimer() {
  sec = 5;
  let timer = setInterval(function () {
    document.getElementById("timerEl").innerHTML = "Timer: " + sec;
    sec--;
    if (sec < 0) {
      failCount++;
      resetBoard
    ();
    }
  }, 1000);
}

//GENERATING RANDOM COLOR
function getRandomColor() {
  let a = getColorValue();
  let b = getColorValue();
  let c = getColorValue();
  return new Color(a, b, c);
}

function getColorValue() {
  return getRandomInt(256);
}

function getRandomInt(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

function handleClick(index) {
  if (index == differentSquareIndex) {
    successCount++;
  } else {
    failCount++;
  }
  successEl.innerText = successCount;
  failEl.innerText = failCount;
  resetBoard
();
}

// CREATE CELLS
function createCells() {
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
  for (let i = 0; i < rowCount; i++) {
    let rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");

    for (j = 0; j < columnCount; j++) {
      let cellEl = document.createElement("div");
      cellEl.setAttribute("class", "square");
      rowEl.appendChild(cellEl);
    }
    board.appendChild(rowEl);
  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", () => {
      handleClick(i);
    });
  }
}

// PROGRAM STARTS

createCells();
startButton.addEventListener("click", startGame);
