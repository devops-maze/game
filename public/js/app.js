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
  removeMaze();
  createBlankMaze(dimensions);
  maze.path = createPath();
  generateMazeWalls(maze.path);
  placeCharacter();
  placeTarget();
  // document.onkeydown = moveCharacter;
}
