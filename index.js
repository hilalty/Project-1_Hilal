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

let configuration;

// VARIABLES
const squares = document.getElementsByClassName("square");
const board = document.getElementById("board");

const successEl = document.getElementById("successEl");
const failEl = document.getElementById("failEl");

const rowCountEl = document.getElementById("inputEl1");
const columnCountEl = document.getElementById("inputEl2");

const startButton = document.getElementById("startButton");
const playerName = document.getElementById("playerName");

const boardAndStatsEl = document.getElementById("boardAndStats");
const gameOptionsEl = document.getElementById("gameOptionsDiv");

const highScoreEl = document.getElementById("highScore");

boardAndStatsEl.style.display = "none";

let myInterval;

let highScore = 0;

// ASSIGNING COLOR
function resetBoard() {
  checkGameOver();
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
function initialize() {
  configuration = new Configuration(4, 4, 15, 15, 60, 0, 0, 0);
  boardAndStatsEl.style.display = "none";
  gameOptionsEl.style.display = "block";
  readHighScore();
}

function startGame() {
  configuration.rowCount = parseInt(rowCountEl.value);
  configuration.columnCount = parseInt(columnCountEl.value);
  playerName.innerHTML = document.getElementById("playerNameInput").value;
  gameOptionsEl.style.display = "none";
  boardAndStatsEl.style.display = "block";
  initializeTimer();
  createCells();
  resetBoard();
}

function initializeTimer() {
  configuration.sec = configuration.timerLength;

  document.getElementById("timerEl").innerHTML = "Timer: " + configuration.sec;

  myInterval = setInterval(function () {
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

function changeDifficulty() {
  const option = document.getElementById("difficulty").value;

  switch (option) {
    case "easy":
      configuration.colorSpectrum = 60;
      configuration.timerLength = 15;
      break;
    case "average":
      configuration.colorSpectrum = 45;
      configuration.timerLength = 10;
      break;
    case "advanced":
      configuration.colorSpectrum = 30;
      configuration.timerLength = 6;
      break;
    case "hard":
      configuration.colorSpectrum = 15;
      configuration.timerLength = 3;
      break;
  }
}

function checkGameOver() {
  if (configuration.failCount == 3) {
    clearInterval(myInterval);
    writeHighScore();
    alert("Game Over!!!");
    initialize();
  }
}

function readHighScore() {
  let scoreText = localStorage.getItem("high_score");
  let score = parseInt(scoreText);
  if (score > 0) {
    highScore = score;
  }
  highScoreEl.innerText = highScore;
}

function writeHighScore() {
  if (configuration.successCount > highScore) {
    localStorage.setItem("high_score", configuration.successCount);
  }
}

// PROGRAM STARTS
initialize();
startButton.addEventListener("click", startGame);
