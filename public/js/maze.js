class Node {
  constructor(posY, posX) {
    this.id = `cell_${posY}_${posX}`;
    this.posY = posY;
    this.posX = posX;
    this.visited = false;
    this.exits = ["up", "down", "left", "right"];
  }

  visit() {
    this.visited = true;
  }
}

class Traveller {
  constructor() {
    this.posY = 1;
    this.posX = 1;
    this.position = `cell_1_1`;
    this.backtrack = [nodeList[0]];
    this.path = [nodeList[0].id];
  }

  move() {
    let currentNode = nodeList.find(({ id }) => id === this.position);
    let direction;
    let nextDirection;

    let randomMove;
    if (currentNode.exits.length === 1) {
      randomMove = currentNode.exits[0];
    } else {
      randomMove = currentNode.exits[Math.floor(Math.random() * currentNode.exits.length)];
    }

    if (currentNode.exits.length === 0) {
      let i = this.backtrack.length - 1;
      while (currentNode.exits.length === 0) {
        currentNode = this.backtrack[i];
        i--;
      }
      this.position = `${currentNode.id}`;
      this.posY = nodeToPosObj(currentNode.id, "y");
      this.posX = nodeToPosObj(currentNode.id, "x");
      this.path.push(`backtrack_${currentNode.id}`);

      return;
    } else if (currentNode.exits.length > 0) {
      if (randomMove == "up" && currentNode.exits.includes(randomMove)) {
        this.posY--;
        direction = "up";
        nextDirection = "down";
      } else if (randomMove == "down" && currentNode.exits.includes(randomMove)) {
        this.posY++;
        direction = "down";
        nextDirection = "up";
      } else if (randomMove == "left" && currentNode.exits.includes(randomMove)) {
        this.posX--;
        direction = "left";
        nextDirection = "right";
      } else if (randomMove == "right" && currentNode.exits.includes(randomMove)) {
        this.posX++;
        direction = "right";
        nextDirection = "left";
      }
    }
    currentNode.exits = currentNode.exits.filter((v) => v !== direction);
    this.position = `cell_${this.posY}_${this.posX}`;

    let nextNode = nodeList.find(({ id }) => id === this.position);
    nextNode.exits = nextNode.exits.filter((v) => v !== nextDirection);

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

      return;
    }

    nextNode.visit();

    this.backtrack.push(nextNode);
    this.path.push(nextNode.id);
    return;
  }
}

let nodeList;

// Initialize maze state, create nodes and generate HTML view of maze
function createBlankMaze(mazeDimensions, placeId) {
  let div = () => document.createElement("div");
  const mazeCanvas = document.getElementById(placeId);

  charPos = `cell_1_1`;
  charPosY = 1;
  charPosX = 1;
  steps = 0;
  nodeList = [];

  const maze = div();
  maze.setAttribute("id", "maze");

  for (let rowIndex = 1; rowIndex <= mazeDimensions; rowIndex++) {
    let row = div();
    row.classList.add("maze-row");
    if (mazeDimensions == 5) {
      row.classList.add("row-5");
    } else if (mazeDimensions == 10) {
      row.classList.add("row-10");
    } else if (mazeDimensions == 20) {
      row.classList.add("row-20");
    } else if (mazeDimensions == 25) {
      row.classList.add("row-25");
    } else {
      console.error(mazeDimensions + " is not a valid maze layout!");
    }

    for (let colIndex = 1; colIndex <= mazeDimensions; colIndex++) {
      let column = div();

      if (mazeDimensions == 5) {
        column.classList.add("column-5");
      } else if (mazeDimensions == 10) {
        column.classList.add("column-10");
      } else if (mazeDimensions == 20) {
        column.classList.add("column-20");
      } else if (mazeDimensions == 25) {
        column.classList.add("column-25");
      } else {
        console.error(mazeDimensions + " is not a valid maze layout!");
      }

      let cell = div();

      if (rowIndex === 1 && colIndex === 1) {
        cell.classList.add("start");
        let char = div();
        char.setAttribute("id", "character");
        cell.appendChild(char);
      } else if (rowIndex === mazeDimensions && colIndex === mazeDimensions) {
        cell.classList.add("finish");
        let targ = div();
        targ.setAttribute("id", "target");
        cell.appendChild(targ);
      }
      cell.classList.add("maze-cell");
      cell.setAttribute("id", `cell_${rowIndex}_${colIndex}`);

      // Create nodes and push them into an array
      nodeList.push(new Node(rowIndex, colIndex));

      column.appendChild(cell);
      row.appendChild(column);
    }
    maze.appendChild(row);
  }
  mazeCanvas.appendChild(maze);

  // Remove moves that lead out of bounds
  removeEdgeMoves(mazeDimensions);
}

// Creates the route through the node objects
function createPath() {
  const traveller = new Traveller();
  let mazeSize = Math.pow(maze.dimensions, 2);
  while (traveller.backtrack.length < mazeSize) {
    traveller.move();
  }
  return traveller.path;
}

// Give this a valid path and generate your maze
function generateMazeFromPath(path) {
  console.log("fokme");
  for (let i = 0; i < path.length - 1; i++) {
    let step = path[i];
    let nextStep = path[i + 1];
    if (nextStep.slice(0, 10) === "backtrack_" || (nextStep.slice(0, 10) === "backtrack_" && step.slice(0, 10) === "backtrack_")) {
      continue;
    } else if (step.slice(0, 10) === "backtrack_") {
      step = step.slice(10);
    }
    if (nodeToPosObj(step, "y") > nodeToPosObj(nextStep, "y")) {
      // moving UP
      $(`#${step}`).addClass("no-top-border");
      $(`#${nextStep}`).addClass("no-bottom-border");
    } else if (nodeToPosObj(step, "y") < nodeToPosObj(nextStep, "y")) {
      // moving DOWN
      $(`#${step}`).addClass("no-bottom-border");
      $(`#${nextStep}`).addClass("no-top-border");
    } else if (nodeToPosObj(step, "x") > nodeToPosObj(nextStep, "x")) {
      // moving LEFT
      $(`#${step}`).addClass("no-left-border");
      $(`#${nextStep}`).addClass("no-right-border");
    } else if (nodeToPosObj(step, "x") < nodeToPosObj(nextStep, "x")) {
      // moving RIGHT
      $(`#${step}`).addClass("no-right-border");
      $(`#${nextStep}`).addClass("no-left-border");
    }
  }
}

function nodeToPosObj(nodeId, axis) {
  if (axis === "y") {
    return nodeId
      .slice(5)
      .split("_")
      .map(function (item) {
        return parseInt(item, 10);
      })[0];
  } else if (axis === "x") {
    return nodeId
      .slice(5)
      .split("_")
      .map(function (item) {
        return parseInt(item, 10);
      })[1];
  }
}

function removeMaze() {
  let elem = document.getElementById("maze");

  if (elem != null) {
    elem.parentNode.removeChild(elem);
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
      img.setAttribute("id", "character-image");
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
      const target = document.getElementById("target");
      const img = document.createElement("img");
      img.src = url;
      target.appendChild(img);
    })
    .catch(function (error) {
      console.error(error);
    });
}

let charPos = `cell_1_1`;
let charPosY = 1;
let charPosX = 1;
let steps = 0;

function moveCharacter(e) {
  e = e || window.event;
  const character = document.getElementById("character");

  if (e.keyCode == "38" && charPosY > 1 && $(`#${charPos}`).hasClass("no-top-border")) {
    charPosY--;
  } else if (e.keyCode == "40" && charPosY < maze.dimensions && $(`#${charPos}`).hasClass("no-bottom-border")) {
    charPosY++;
  } else if (e.keyCode == "37" && charPosX > 1 && $(`#${charPos}`).hasClass("no-left-border")) {
    charPosX--;
  } else if (e.keyCode == "39" && charPosX < maze.dimensions && $(`#${charPos}`).hasClass("no-right-border")) {
    charPosX++;
  }
  steps++;
  charPos = `cell_${charPosY}_${charPosX}`;

  character.parentNode.removeChild(character);
  document.getElementById(charPos).appendChild(character);
  checkWinCondition(charPos);
}

function checkWinCondition(pos) {
  if ($(`#${pos}`).hasClass("finish")) {
    const character = document.getElementById("character");
    character.parentNode.removeChild(character);
    document.onkeydown = null;
    const winPopup = document.getElementById("win-popup");
    winPopup.style.display = "flex";
    const p = document.createElement("p");
    p.innerHTML = `You took ${steps} steps to complete the map`;
    p.classList.add("row");
    winPopup.appendChild(p);
    updateDoc();
    newMazeToFirestore();
  }
}

document.addEventListener("click", () => {
  const winPopup = document.getElementById("win-popup");
  winPopup.style.display = "none";
  const p = document.querySelector("#win-popup p");
  if (p != null) {
    winPopup.removeChild(p);
  }
});

const db = firebase.firestore();

function removeEdgeMoves(dimensions) {
  nodeList[0].visited = true;
  if (dimensions === 5) {
    for (const elem in nodeList) {
      if (nodeList.hasOwnProperty(elem)) {
        const node = nodeList[elem];
        if (/cell_1_\d$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "up");
        }
        if (/cell_5_\d$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "down");
        }
        if (/cell_\d_1$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "left");
        }
        if (/cell_\d_5$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "right");
        }
      }
    }
  } else if (dimensions === 10) {
    for (const elem in nodeList) {
      if (nodeList.hasOwnProperty(elem)) {
        const node = nodeList[elem];
        if (/cell_1_\d+$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "up");
        }
        if (/cell_10_\d+$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "down");
        }
        if (/cell_\d+_1$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "left");
        }
        if (/cell_\d+_10$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "right");
        }
      }
    }
  } else if (dimensions === 20) {
    for (const elem in nodeList) {
      if (nodeList.hasOwnProperty(elem)) {
        const node = nodeList[elem];
        if (/cell_1_\d+$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "up");
        }
        if (/cell_20_\d+$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "down");
        }
        if (/cell_\d+_1$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "left");
        }
        if (/cell_\d+_20$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "right");
        }
      }
    }
  } else if (dimensions === 25) {
    for (const elem in nodeList) {
      if (nodeList.hasOwnProperty(elem)) {
        const node = nodeList[elem];
        if (/cell_1_\d+$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "up");
        }
        if (/cell_25_\d+$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "down");
        }
        if (/cell_\d+_1$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "left");
        }
        if (/cell_\d+_25$/.test(node.id)) {
          node.exits = node.exits.filter((v) => v !== "right");
        }
      }
    }
  }
}
