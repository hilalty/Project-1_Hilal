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
const container = document.getElementById("container");
const squares = document.getElementsByClassName("square");
let differentSquareIndex;
const successEl = document.getElementById("successEl");
const failEl = document.getElementById("failEl");
let successCount = 0;
let failCount = 0;

// ASSIGNING COLOR
function assignColor() {
  differentSquareIndex = Math.floor(Math.random() * 16);
  let selectedColorAll = getRandomColor();
  let selectedColorOne = getSimilarColor(selectedColorAll);
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = selectedColorAll.toString();
  }
  squares[differentSquareIndex].style.backgroundColor =
    selectedColorOne.toString();
}
assignColor();

function getSimilarColor(mainColor) {
  return new Color(mainColor.r + 30, mainColor.g + 30, mainColor.b + 30);
}

//GENERATING RANDOM COLOR
function getRandomColor() {
  let a = getColorValue();
  let b = getColorValue();
  let c = getColorValue();
  return new Color(a, b, c);
}
console.log(getRandomColor());

function getColorValue() {
  return Math.floor(Math.random() * 256);
}

// CLICK FUNCTIONS
for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", () => {
    handleClick(i);
  });
}

function handleClick(index) {
  if (index == differentSquareIndex) {
    successCount++;
  } else {
    failCount++;
  }
  successEl.innerText = successCount;
  failEl.innerText = failCount;
  assignColor();
}
