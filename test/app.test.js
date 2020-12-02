const mazeFun = require("../public/js/maze");
const Maze = require("../public/js/user").Maze;
const Traveller = require("../public/js/maze").Traveller;

let maze = new Maze(10, [], 0, "");
test("should initialize maze object", () => {
  expect(maze).toMatchObject({ dimensions: 10, path: maze.path, steps: 0, formattedTime: "" });
});

document.body.innerHTML = '<div id="canvas">' + "</div>";
const traveller = new Traveller(mazeFun.createBlankMaze(maze.dimensions, "canvas"));
test("should create blank maze", () => {
  const canvas = document.getElementById("maze");
  expect(canvas.childNodes).toHaveLength(10);
});

maze.path = mazeFun.createPath(traveller, maze.dimensions);
test("should create path for maze traversal", () => {
  expect(maze.path.length).toBeGreaterThan(100);
});

test("should contain backtrack cells", () => {
  maze.path.forEach((cell) => {
    if (cell.startsWith("backtrack")) {
      expect(cell).toMatch(/^backtrack_cell_\d+_\d+$/);
    } else {
      expect(cell).toMatch(/^cell_\d+_\d+$/);
    }
  });
});

mazeFun.generateMazeFromPath(maze.path, "");

test("should remove maze", () => {
  mazeFun.removeMaze();
  let elem = document.getElementById("maze");
  expect(elem).toBeNull();
});
