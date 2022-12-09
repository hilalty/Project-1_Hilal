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

class Configuration {
  constructor(
    rowCount,
    columnCount,
    timerLength,
    sec,
    colorSpectrum,
    successCount,
    failCount,
    differentSquareIndex
  ) {
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.timerLength = timerLength;
    this.sec = sec;
    this.colorSpectrum = colorSpectrum;
    this.successCount = successCount;
    this.failCount = failCount;
    this.differentSquareIndex = differentSquareIndex;
  }
}

let configuration = new Configuration(4, 4, 15, 15, 60, 0, 0, 0);
document.getElementById("boardAndStats").style.display = "none";

// VARIABLES
const squares = document.getElementsByClassName("square");
const board = document.getElementById("board");

const successEl = document.getElementById("successEl");
const failEl = document.getElementById("failEl");

const rowCountEl = document.getElementById("inputEl1");
const columnCountEl = document.getElementById("inputEl2");

const startButton = document.getElementById("startButton");
const playerName = document.getElementById("playerName");


// ASSIGNING COLOR
function resetBoard() {
  failEl.innerText = configuration.failCount;
  successEl.innerText = configuration.successCount;

  configuration.differentSquareIndex = getRandomInt(
    configuration.rowCount * configuration.columnCount
  );
  let selectedColorAll = getRandomColor();
  let selectedColorOne = getSimilarColor(selectedColorAll);
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = selectedColorAll.toString();
  }
  squares[configuration.differentSquareIndex].style.backgroundColor =
    selectedColorOne.toString();
  configuration.sec = configuration.timerLength;
}

function getSimilarColor(mainColor) {
  return new Color(
    mainColor.r + configuration.colorSpectrum,
    mainColor.g + configuration.colorSpectrum,
    mainColor.b + configuration.colorSpectrum
  );
}

//START GAME
function startGame() {
  configuration.rowCount = parseInt(rowCountEl.value);
  configuration.columnCount = parseInt(columnCountEl.value);
  playerName.innerHTML = document.getElementById("playerNameInput").value;
  document.getElementById("gameOptionsDiv").style.display = "none";
  document.getElementById("boardAndStats").style.display = "block";
  initializeTimer();
  createCells();
  resetBoard();
}

function initializeTimer() {
  configuration.sec = configuration.timerLength;

  document.getElementById("timerEl").innerHTML = "Timer: " + configuration.sec;

  setInterval(function () {
    document.getElementById("timerEl").innerHTML =
      "Timer: " + configuration.sec;
    configuration.sec--;
    if (configuration.sec < 0) {
      configuration.failCount++;
      resetBoard();
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
  if (index == configuration.differentSquareIndex) {
    configuration.successCount++;
  } else {
    configuration.failCount++;
  }
  successEl.innerText = configuration.successCount;
  failEl.innerText = configuration.failCount;
  resetBoard();
}

// CREATE CELLS
function createCells() {
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild);
  }
  for (let i = 0; i < configuration.rowCount; i++) {
    let rowEl = document.createElement("div");
    rowEl.setAttribute("class", "row");

    for (j = 0; j < configuration.columnCount; j++) {
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

function changeDifficulty() {
  const option = document.getElementById("difficulty").value;

  if (option == "easy") {
    configuration.colorSpectrum = 60;
    configuration.timerLength = 15;

  }
  if (option == "average") {
    configuration.colorSpectrum = 45;
    configuration.timerLength = 10;
  }
  if (option == "advanced") {
    configuration.colorSpectrum = 30;
    configuration.timerLength = 6;
  }
  if (option == "hard") {
    configuration.colorSpectrum = 15;
    configuration.timerLength = 3;
  }
}
