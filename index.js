console.log("linked");

const container = document.getElementById("container");

const squares = document.getElementsByClassName("square");

function assignColor() {
    let selectedColor = getRandomColor();
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = selectedColor;
  }
}

assignColor();

function getRandomColor() {
    let a = getColorValue();
    let b = getColorValue();
    let c = getColorValue();
    return "rgb(" + a + "," + b + "," + c + ")";
}
console.log(getRandomColor());

function getColorValue() {
    return Math.floor(Math.random()*256);
}
