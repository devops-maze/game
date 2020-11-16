class Node {
  constructor(id) {
    this.id = id;
    this.visited = false;
    this.exits = ["up", "down", "left", "right"];
  }

  visualize() {
    let div = document.createElement("div");
    div.classList.add("node");

    let cell = document.getElementById(this.id);
    cell.appendChild(div);
  }

  visit() {
    this.visited = true;
    let cell = document.getElementById(this.id);
    cell.firstElementChild.classList.add("visited");
  }
}

class Character {
  constructor(bounds) {
    this.posY = 1;
    this.posX = 1;
    this.bounds = bounds;
    this.steps = 0;
    this.directions = ["up", "down", "left", "right"];
    this.position = `cell_1_1`;
  }

  move() {
    this.devisualize();
    let currentNode = nodeList.find(({ id }) => id === this.position);
    let direction;
    let nextDirection;

    let randomMove;
    if (currentNode.exits.length === 1) {
      randomMove = currentNode.exits[0];
    } else {
      randomMove = this.directions[Math.floor(Math.random() * 4)];
    }
    console.log(randomMove);

    if (currentNode.exits.length > 0) {
      if (randomMove == "up" && this.posY > 1 && currentNode.exits.includes("up")) {
        this.posY--;
        direction = "up";
        nextDirection = "down";
      } else if (randomMove == "down" && this.posY < this.bounds && currentNode.exits.includes("down")) {
        this.posY++;
        direction = "down";
        nextDirection = "up";
      } else if (randomMove == "left" && this.posX > 1 && currentNode.exits.includes("left")) {
        this.posX--;
        direction = "left";
        nextDirection = "right";
      } else if (randomMove == "right" && this.posX < this.bounds && currentNode.exits.includes("right")) {
        this.posX++;
        direction = "right";
        nextDirection = "left";
      }
    }

    currentNode.exits = currentNode.exits.filter((v) => v != direction);
    this.position = `cell_${this.posY}_${this.posX}`;

    let nextNode = nodeList.find(({ id }) => id === this.position);
    nextNode.exits = nextNode.exits.filter((v) => v != nextDirection);

    // TODO: extend this code to enable for backtracking.
    if (nextNode.visited) {
      if (direction === "up") {
        this.posY++;
      } else if (direction === "down") {
        this.posY--;
      } else if (direction === "left") {
        this.posX++;
      } else if (direction === "right") {
        this.posX--;
      }
      this.position = `cell_${this.posY}_${this.posX}`;
      nextNode = nodeList.find(({ id }) => id === this.position);
      this.visualize();
      return console.table(nextNode);
    }

    nextNode.visit();
    this.visualize();
    return console.table(nextNode);
  }

  devisualize() {
    let cell = document.getElementById(this.position);
    cell.firstElementChild.classList.remove("char");
  }

  visualize() {
    let cell = document.getElementById(this.position);
    cell.firstElementChild.classList.add("char");
  }
}

let nodeList = [];
let character;

function createBlankMaze(mazeDimensions) {
  let div = () => document.createElement("div");
  const mazeCanvas = document.getElementById("maze-canvas");

  const maze = div();
  maze.setAttribute("id", "maze");

  for (let rowIndex = 1; rowIndex <= mazeDimensions; rowIndex++) {
    let row = div();
    row.classList.add("maze-row");
    row.classList.add("row-10");

    for (let colIndex = 1; colIndex <= mazeDimensions; colIndex++) {
      let column = div();
      let cell = div();

      column.classList.add("column-10");

      if (rowIndex === 1 && colIndex === 1) {
        cell.classList.add("start");
      } else if (rowIndex === mazeDimensions && colIndex === mazeDimensions) {
        cell.classList.add("finish");
      }
      cell.classList.add("maze-cell");
      cell.setAttribute("id", `cell_${rowIndex}_${colIndex}`);

      nodeList.push(new Node(`cell_${rowIndex}_${colIndex}`));

      column.appendChild(cell);
      row.appendChild(column);
    }
    maze.appendChild(row);
  }
  mazeCanvas.appendChild(maze);

  character = new Character(mazeDimensions);
  console.log(character);

  for (const elem in nodeList) {
    if (nodeList.hasOwnProperty(elem)) {
      const node = nodeList[elem];
      node.visualize();
    }
  }

  const visitFirstCell = () => {
    const cell = document.getElementById("cell_1_1");
    cell.firstElementChild.classList.add("visited");
  };

  visitFirstCell();
}

document.body.onkeydown = function (e) {
  if (e.keyCode == 32) {
    character.move();
  }
};

function removeMaze() {
  let elem = document.getElementById("maze");

  if (elem != null) {
    elem.parentNode.removeChild(elem);
  }
}

// function createGaps(mazeDimensions) {
//   for (let colIndex = 1; colIndex <= mazeDimensions - 1; colIndex++) {
//     let randomGap = Math.floor(Math.random() * mazeDimensions) + 1;
//     for (let rowIndex = 1; rowIndex <= mazeDimensions; rowIndex++) {
//       if (randomGap == rowIndex) {
//         let cell = document.getElementById(`cell_${rowIndex}_${colIndex}`);
//         cell.classList.add("gap");
//       }
//     }
//   }
// }

// const storage = firebase.storage();
// const storageRef = storage.ref();
// const imagesRef = storageRef.child("images");

// function placeCharacter() {
//   const charImg = imagesRef.child("deno.png");
//   charImg
//     .getDownloadURL()
//     .then(function (url) {
//       const character = document.getElementById("character");
//       const img = document.createElement("img");
//       img.setAttribute("id", "character-image");
//       img.src = url;
//       character.appendChild(img);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }

// function placeTarget() {
//   const targImg = imagesRef.child("portal.png");
//   targImg
//     .getDownloadURL()
//     .then(function (url) {
//       const target = document.getElementById("target");
//       const img = document.createElement("img");
//       img.src = url;
//       target.appendChild(img);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
// }

// let charPos;
// let posY;
// let posX;
// let steps;

// function moveCharacter(e) {
//   e = e || window.event;
//   const character = document.getElementById("character");
//   let mazeDimensions = document.getElementById("maze").children.length;

//   const isGap = (y, x) => {
//     if (y < 1 || x < 1 || y > mazeDimensions || x > mazeDimensions) {
//       return console.log(`Out of bounds! 🔥`);
//     } else {
//       return document
//         .getElementById(`cell_${y}_${x}`)
//         .classList.contains("gap");
//     }
//   };

//   if (e.keyCode == "38" && posY > 1) {
//     posY--;
//   } else if (e.keyCode == "40" && posY < mazeDimensions) {
//     posY++;
//   } else if (e.keyCode == "37" && posX > 1 && isGap(posY, posX - 1)) {
//     posX--;
//   } else if (e.keyCode == "39" && posX < mazeDimensions && isGap(posY, posX)) {
//     posX++;
//   }
//   steps++;
//   charPos = `cell_${posY}_${posX}`;

//   character.parentNode.removeChild(character);
//   document.getElementById(charPos).appendChild(character);
//   checkWinCondition(charPos);
// }

// function checkWinCondition(pos) {
//   if (document.getElementById(pos).classList.contains("finish")) {
//     const character = document.getElementById("character");
//     character.parentNode.removeChild(character);
//     document.onkeydown = null;
//     const winPopup = document.getElementById("win-popup");
//     winPopup.style.display = "flex";
//     const p = document.createElement("p");
//     p.innerHTML = `You took ${steps} steps to complete the map`;
//     p.classList.add("row");
//     winPopup.appendChild(p);
//     updateDoc();
//   }
// }

// document.addEventListener("click", () => {
//   const winPopup = document.getElementById("win-popup");
//   winPopup.style.display = "none";
//   const p = document.querySelector("#win-popup p");
//   if (p != null) {
//     winPopup.removeChild(p);
//   }
// });

// const db = firebase.firestore();

// function updateDoc() {
//   if (user != null) {
//     let newHighscoreDocRef = db.collection("highscores").doc(user.email);
//     if (mazeDimensions.value == 5) {
//       newHighscoreDocRef.update({
//         easy: firebase.firestore.FieldValue.arrayUnion(steps),
//       });
//     } else if (mazeDimensions.value == 10) {
//       newHighscoreDocRef.update({
//         medium: firebase.firestore.FieldValue.arrayUnion(steps),
//       });
//     } else if (mazeDimensions.value == 20) {
//       newHighscoreDocRef.update({
//         hard: firebase.firestore.FieldValue.arrayUnion(steps),
//       });
//     } else {
//       newHighscoreDocRef.update({
//         extreme: firebase.firestore.FieldValue.arrayUnion(steps),
//       });
//     }
//     writeHighscores();
//   }
// }
