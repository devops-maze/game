(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const mazeFun = require("./maze");
const Traveller = require("./maze").Traveller;
const userFun = require("./user");
const Maze = require("./user").Maze;

window.addEventListener("DOMContentLoaded", () => {
  initMaze(maze.dimensions);
});

let maze = new Maze(10, [], 0, "");

function initMaze(dimensions) {
  // Remove maze HTMLElements
  mazeFun.removeMaze();
  // Initialize maze state, create nodes and generate HTML view of maze
  let traveller = new Traveller(mazeFun.createBlankMaze(dimensions, "maze-canvas"));
  // Creates the route through the node objects
  maze.path = mazeFun.createPath(traveller, maze.dimensions);
  // Give this a valid path and generate your maze
  mazeFun.generateMazeFromPath(maze.path, "");
  // Get image and place it at the start
  mazeFun.placeCharacter();
  // Get image and place it at the end
  mazeFun.placeTarget();
  // Listen for arrow keys
  document.onkeydown = mazeFun.moveCharacter;
}

function tooltip() {
  $("#tooltip").tooltip("show");
}

function setDifficulty(mode) {
  const btn = $("#difficulty");
  if (mode === "easy") {
    btn.html("Easy");
    maze.dimensions = 5;
  } else if (mode === "medium") {
    btn.html("Medium");
    maze.dimensions = 10;
  } else if (mode === "hard") {
    btn.html("Hard");
    maze.dimensions = 20;
  } else if (mode === "extreme") {
    btn.html("Extreme");
    maze.dimensions = 25;
  }
  maze.path = [];
}

// Convert time to a format of hours, minutes, seconds, and milliseconds
let formattedTime;
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  formattedTime = `${formattedMM}:${formattedSS}:${formattedMS}`;
  return formattedTime;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
}

function pause() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
}

const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

startButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);

$("#easy-option").click(function () {
  setDifficulty("easy");
});
$("#medium-option").click(function () {
  setDifficulty("medium");
});
$("#hard-option").click(function () {
  setDifficulty("hard");
});
$("#extreme-option").click(function () {
  setDifficulty("extreme");
});
$("#start").click(function () {
  initMaze(maze.dimensions);
});
$("#login-btn").click(function () {
  userFun.googleLogin();
});
$("#profile-btn").click(function () {
  userFun.profileOnClick();
});
$("#tooltip").click(function () {
  tooltip();
});
$("#transform").click(function () {
  userFun.showMatches();
});
$("#logout-btn").click(function () {
  userFun.logout();
});
$("#match-history-btn").click(function () {
  userFun.showMatchHistory();
});

},{"./maze":2,"./user":3}],2:[function(require,module,exports){
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
  constructor(nodeList) {
    this.posY = 1;
    this.posX = 1;
    this.position = `cell_1_1`;
    this.nodeList = nodeList;
    this.backtrack = [nodeList[0]];
    this.path = [nodeList[0].id];
  }

  move() {
    let currentNode = this.nodeList.find(({ id }) => id === this.position);
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

    let nextNode = this.nodeList.find(({ id }) => id === this.position);
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

      nextNode = this.nodeList.find(({ id }) => id === this.position);

      return;
    }

    nextNode.visit();

    this.backtrack.push(nextNode);
    this.path.push(nextNode.id);
    return;
  }
}

// Initialize maze state, create nodes and generate HTML view of maze
function createBlankMaze(mazeDimensions, placeId) {
  let div = () => document.createElement("div");
  const mazeCanvas = document.getElementById(placeId);

  charPos = `cell_1_1`;
  charPosY = 1;
  charPosX = 1;
  steps = 0;
  let nodeList = [];

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
  removeEdgeMoves(mazeDimensions, nodeList);
  return nodeList;
}

// Creates the route through the node objects
function createPath(traveller, dimensions) {
  let mazeSize = Math.pow(dimensions, 2);
  while (traveller.backtrack.length < mazeSize) {
    traveller.move();
  }
  return traveller.path;
}

// Give this a valid path and generate your maze
function generateMazeFromPath(path, query) {
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
      $(`${query}#${step}`).addClass("no-top-border");
      $(`${query}#${nextStep}`).addClass("no-bottom-border");
    } else if (nodeToPosObj(step, "y") < nodeToPosObj(nextStep, "y")) {
      // moving DOWN
      $(`${query}#${step}`).addClass("no-bottom-border");
      $(`${query}#${nextStep}`).addClass("no-top-border");
    } else if (nodeToPosObj(step, "x") > nodeToPosObj(nextStep, "x")) {
      // moving LEFT
      $(`${query}#${step}`).addClass("no-left-border");
      $(`${query}#${nextStep}`).addClass("no-right-border");
    } else if (nodeToPosObj(step, "x") < nodeToPosObj(nextStep, "x")) {
      // moving RIGHT
      $(`${query}#${step}`).addClass("no-right-border");
      $(`${query}#${nextStep}`).addClass("no-left-border");
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

function placeCharacter() {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imagesRef = storageRef.child("images");
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
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imagesRef = storageRef.child("images");
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
    p.classList.add("row");
    winPopup.appendChild(p);
    pause();
    p.innerHTML = `You took ${steps} steps and ${formattedTime} time to complete the map`;
    reset();
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

function removeEdgeMoves(dimensions, nodeList) {
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

module.exports = {
  Traveller: Traveller,
  Node: Node,
  nodeToPosObj,
  removeMaze,
  removeEdgeMoves,
  createBlankMaze,
  createPath,
  generateMazeFromPath,
  placeCharacter,
  placeTarget,
  moveCharacter,
};

},{}],3:[function(require,module,exports){
const mazeFun = require("./maze");

class Maze {
  constructor(dimensions, path, steps, formattedTime) {
    this.dimensions = dimensions;
    this.path = path;
    this.steps = steps;
    this.formattedTime = formattedTime;
  }
}

/* Google Login */
let user, name, email, photoUrl;

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      user = result.user;
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;

      let profile = document.getElementById("profile-btn");
      let img = document.createElement("img");
      img.setAttribute("id", "profile-image");
      img.src = photoUrl;
      profile.appendChild(img);

      document.getElementById("login-btn").style.display = "none";
      document.getElementById("profile-btn").style.display = "block";

      writeHighscores();
      writeMatchHistory();
    })
    .catch(console.log);
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      document.getElementById("logout-btn").style.display = "none";
      document.getElementById("login-btn").style.display = "block";

      let image = document.getElementById("profile-image");
      image.parentNode.removeChild(image);
    })
    .catch(function (error) {
      console.error("Logout failed!");
    });
}

function writeHighscores() {
  if (user != null) {
    const userScoresRef = db.collection("highscores").doc(user.email);
    userScoresRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let easy = doc.data().easy;
          let medium = doc.data().medium;
          let hard = doc.data().hard;
          let extreme = doc.data().extreme;

          let easyDiv = document.querySelector("#easy p");
          let mediumDiv = document.querySelector("#medium p");
          let hardDiv = document.querySelector("#hard p");
          let extremeDiv = document.querySelector("#extreme p");

          let easyDiv2 = document.querySelector("#easy2 p");
          let mediumDiv2 = document.querySelector("#medium2 p");
          let hardDiv2 = document.querySelector("#hard2 p");
          let extremeDiv2 = document.querySelector("#extreme2 p");

          easyDiv.innerHTML = `${Math.min(...easy)} steps`;
          mediumDiv.innerHTML = `${Math.min(...medium)} steps`;
          hardDiv.innerHTML = `${Math.min(...hard)} steps`;
          extremeDiv.innerHTML = `${Math.min(...extreme)} steps`;

          easyDiv2.innerHTML = `${Math.min(...easy)} steps`;
          mediumDiv2.innerHTML = `${Math.min(...medium)} steps`;
          hardDiv2.innerHTML = `${Math.min(...hard)} steps`;
          extremeDiv2.innerHTML = `${Math.min(...extreme)} steps`;
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
}

/* opens the profile button */
let profileDd = $("#profile-dropdown");
function profileOnClick() {
  if (profileDd.css("display") == "none") {
    profileDd.css("display", "block");
  } else if (profileDd.css("display") == "block") {
    profileDd.css("display", "none");
  }
}

function updateDoc() {
  if (user != null) {
    let newHighscoreDocRef = db.collection("highscores").doc(user.email);
    if (maze.dimensions === 5) {
      newHighscoreDocRef.update({
        easy: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    } else if (maze.dimensions === 10) {
      newHighscoreDocRef.update({
        medium: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    } else if (maze.dimensions === 20) {
      newHighscoreDocRef.update({
        hard: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    } else if (maze.dimensions === 25) {
      newHighscoreDocRef.update({
        extreme: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    }
    writeHighscores();
  }
}

let matchShow = $("#matches-history");
function showMatches() {
  if (matchShow.css("display") == "none") {
    matchShow.css("display", "flex");
  } else if (matchShow.css("display") == "flex") {
    matchShow.css("display", "none");
  }
}

let matchHistory = $("#matches");
function showMatchHistory() {
  if (matchHistory.css("display") == "none") {
    matchHistory.css("display", "flex");
  } else if (matchHistory.css("display") == "flex") {
    matchHistory.css("display", "none");
  }
}

document.getElementById("closeButton").addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    this.parentNode.style.display = "none";
  },
  false
);

// maze to firestore
const mazeConverter = {
  toFirestore: function (maze) {
    return { dimensions: maze.dimensions, path: maze.path };
  },
};
const db = firebase.firestore();
function newMazeToFirestore() {
  if (user != null) {
    let newMazeRef = db.collection("highscores").doc(user.email);
    if (maze.dimensions == 5) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: steps,
          time: formattedTime,
        }),
      });
    } else if (maze.dimensions == 10) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: steps,
          time: formattedTime,
        }),
      });
    }
    if (maze.dimensions == 20) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: steps,
          time: formattedTime,
        }),
      });
    }
    if (maze.dimensions == 25) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: steps,
          time: formattedTime,
        }),
      });
    }
  }
}

//match-history preview
function writeMatchHistory() {
  let mazes = [];
  if (user != null) {
    const userScoresRef = db.collection("highscores").doc(user.email);
    userScoresRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const mazesArray = doc.data().mazes;
          for (const maze in mazesArray) {
            if (mazesArray.hasOwnProperty(maze)) {
              const obj = mazesArray[maze];
              mazes.push(new Maze(obj.dimensions, obj.path, obj.steps, obj.time));
            }
          }
          console.log(mazes);
          for (let i = 0; i < mazes.length; i++) {
            const maze = mazes[i];
            matchHtml(maze, i);
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
}
function matchHtml(maze, i) {
  let div = () => document.createElement("div");

  const match = div();
  match.classList.add("match");
  const stats = div();
  stats.classList.add("stats-overlay");
  const dif = div();
  dif.classList.add("difficulty");
  const difIcon = div();
  difIcon.classList.add("icon");
  difIcon.innerHTML = "&#128585; :";
  const pDif = document.createElement("p");
  if (maze.dimensions == 5) {
    pDif.innerHTML = "Easy";
  }
  if (maze.dimensions == 10) {
    pDif.innerHTML = "Medium";
  }
  if (maze.dimensions == 20) {
    pDif.innerHTML = "Hard";
  }
  if (maze.dimensions == 25) {
    pDif.innerHTML = "Extreme";
  }
  const time = div();
  time.classList.add("time");
  const timeIcon = div();
  timeIcon.classList.add("icon");
  timeIcon.innerHTML = "&#128338; :";
  const pTime = document.createElement("p");
  pTime.innerHTML = `${maze.formattedTime}`;
  const score = div();
  score.classList.add("score");
  const scoreIcon = div();
  scoreIcon.classList.add("icon");
  scoreIcon.innerHTML = "&#127942; :";
  const pScore = document.createElement("p");
  pScore.innerHTML = `${maze.steps} steps`;
  const mazeMap = div();
  mazeMap.classList.add("maze-map");
  mazeMap.setAttribute("id", `maze-map-${i}`);
  dif.appendChild(difIcon);
  dif.appendChild(pDif);
  time.appendChild(timeIcon);
  time.appendChild(pTime);
  score.appendChild(scoreIcon);
  score.appendChild(pScore);
  stats.appendChild(dif);
  stats.appendChild(time);
  stats.appendChild(score);
  match.appendChild(stats);
  match.appendChild(mazeMap);
  document.getElementById("matches").appendChild(match);
  mazeFun.createBlankMaze(maze.dimensions, `maze-map-${i}`);
  mazeFun.generateMazeFromPath(maze.path, `#maze-map-${i} `);
  const hidebtn = document.createElement("button");
  hidebtn.innerHTML = "Hide stats";
  hidebtn.addEventListener("click", function () {
    stats.style.display = "none";
    showbtn.style.display = "flex";
  });
  const showbtn = document.createElement("button");
  showbtn.innerHTML = "Show stats";
  showbtn.style.display = "none";
  showbtn.addEventListener("click", function () {
    stats.style.display = "flex";
    showbtn.style.display = "none";
  });
  stats.appendChild(hidebtn);
  mazeMap.appendChild(showbtn);
}

module.exports = {
  Maze: Maze,
  googleLogin,
  profileOnClick,
  showMatches,
  logout,
  showMatchHistory,
};

},{"./maze":2}]},{},[1]);
