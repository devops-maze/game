window.addEventListener("DOMContentLoaded", () => {
  initMaze(maze.dimensions);
});

class Maze {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.path = [];
  }
}

let maze = new Maze(10);

function initMaze(dimensions) {
  // Remove maze HTMLElements
  removeMaze();
  // Initialize maze state, create nodes and generate HTML view of maze
  createBlankMaze(dimensions);
  // Creates the route through the node objects
  maze.path = createPath();
  // Give this a valid path and generate your maze
  generateMazeFromPath(maze.path);
  // Get image and place it at the start
  placeCharacter();
  // Get image and place it at the end
  placeTarget();
  // Listen for arrow keys
  document.onkeydown = moveCharacter;
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
