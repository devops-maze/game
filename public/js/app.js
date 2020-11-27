window.addEventListener("DOMContentLoaded", () => {
  initMaze(maze.dimensions);
});

class Maze {
  constructor(dimensions, path, steps, formattedTime) {
    this.dimensions = dimensions;
    this.path = path;
    this.steps = steps;
    this.formattedTime = formattedTime;
  }
}

let maze = new Maze(10);

function initMaze(dimensions) {
  // Remove maze HTMLElements
  removeMaze();
  // Initialize maze state, create nodes and generate HTML view of maze
  createBlankMaze(dimensions, "maze-canvas");
  // Creates the route through the node objects
  maze.path = createPath();
  // Give this a valid path and generate your maze
  generateMazeFromPath(maze.path, "");
  // Get image and place it at the start
  placeCharacter();
  // Get image and place it at the end
  placeTarget();
  // Listen for arrow keys
  document.onkeydown = moveCharacter;
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

let startButton = document.getElementById("start");
let resetButton = document.getElementById("reset");

startButton.addEventListener("click", start);
resetButton.addEventListener("click", reset);
