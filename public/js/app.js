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
