window.addEventListener("DOMContentLoaded", (event) => {
  createNewMaze(10, 10);
});

const mazeWidth = 10;
const mazeHeight = 10;

let charPos;
let posY;
let posX;
let steps;

function moveCharacter(e) {
  e = e || window.event;
  const character = document.getElementById("character");
  const isGap = (y, x) => {
    if (y < 1 || x < 1 || y > 10 || x > 10) {
      return console.log(`Out of bounds! 🔥`);
    } else {
      return document
        .getElementById(`cell_${y}_${x}`)
        .classList.contains("gap");
    }
  };

  if (e.keyCode == "38") {
    posY > 1 ? posY-- : (posY = 1);
    steps++;
  } else if (e.keyCode == "40") {
    posY < 10 ? posY++ : (posY = mazeHeight);
    steps++;
  } else if (e.keyCode == "37" && isGap(posY, posX - 1)) {
    posX > 1 ? posX-- : (posX = 1);
    steps++;
  } else if (e.keyCode == "39" && isGap(posY, posX)) {
    posX < 10 ? posX++ : (posX = mazeWidth);
    steps++;
  }
  charPos = `cell_${posY}_${posX}`;

  character.parentNode.removeChild(character);
  document.getElementById(charPos).appendChild(character);
  console.log(steps);
  checkWinCondition(charPos);
}

function checkWinCondition(pos) {
  if (document.getElementById(pos).classList.contains("finish")) {
    document.onkeydown = null;
    const winPopup = document.getElementById("win-popup");
    winPopup.style.display = "flex";
    const p = document.createElement("p");
    p.innerHTML = `${steps} steps`;
    winPopup.appendChild(p);
  }
}

function createNewMaze(mazeWidth, mazeHeight) {
  charPos = "";
  posY = 1;
  posX = 1;
  steps = 0;
  removeMaze();
  document.onkeydown = moveCharacter;
  document.getElementById("win-popup").style.display = "none";

  let div = () => document.createElement("div");
  const mazeCanvas = document.getElementById("maze-canvas");

  const maze = div();
  maze.setAttribute("id", "maze");

  for (let rowIndex = 1; rowIndex <= mazeHeight; rowIndex++) {
    let row = div();
    row.classList.add("maze-row");

    for (let colIndex = 1; colIndex <= mazeWidth; colIndex++) {
      let column = div();
      column.classList.add("maze-column");
      let cell = div();

      if (rowIndex === 1 && colIndex === 1) {
        cell.classList.add("start");
        cell.setAttribute("type", "start");
        let character = div();
        character.setAttribute("id", "character");
        cell.appendChild(character);
      } else if (rowIndex === mazeHeight && colIndex === mazeWidth) {
        cell.classList.add("finish");
        cell.setAttribute("type", "finish");
        let target = div();
        target.setAttribute("id", "target");
        cell.appendChild(target);
      }
      cell.classList.add("maze-cell");
      cell.setAttribute("id", `cell_${rowIndex}_${colIndex}`);

      column.appendChild(cell);
      row.appendChild(column);
    }
    maze.appendChild(row);
  }
  mazeCanvas.appendChild(maze);

  createGaps(mazeWidth, mazeHeight);
  placeCharacter();
  placeTarget();
}

function removeMaze() {
  let elem = document.getElementById("maze");

  if (elem != null) {
    elem.parentNode.removeChild(elem);
  }
}

function createGaps(mazeWidth, mazeHeight) {
  for (let colIndex = 1; colIndex <= mazeWidth - 1; colIndex++) {
    let randomGap = Math.floor(Math.random() * 9) + 1;
    for (let rowIndex = 1; rowIndex <= mazeHeight; rowIndex++) {
      if (randomGap == rowIndex) {
        let cell = document.getElementById(`cell_${rowIndex}_${colIndex}`);
        cell.classList.add("gap");
      }
    }
  }
}

const storage = firebase.storage();
const storageRef = storage.ref();
const imagesRef = storageRef.child("images");

function placeCharacter() {
  const charImg = imagesRef.child("deno.png");
  charImg
    .getDownloadURL()
    .then(function (url) {
      const character = document.getElementById("character");
      const img = document.createElement("img");
      img.src = url;
      character.appendChild(img);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function placeTarget() {
  const targImg = imagesRef.child("portal.png");
  targImg
    .getDownloadURL()
    .then(function (url) {
      console.log(url);
      const target = document.getElementById("target");
      const img = document.createElement("img");
      img.src = url;
      target.appendChild(img);
    })
    .catch(function (error) {
      console.error(error);
    });
}
