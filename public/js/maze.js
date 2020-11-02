window.addEventListener("DOMContentLoaded", (event) => {
  createNewMaze(10, 10);
});

function createNewMaze(mazeWidth, mazeHeight) {
  removeMaze();

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
      } else
        if (rowIndex === 1 && colIndex === 1) {
          cell.classList.add("start");
          cell.setAttribute("type", "start");
          let target = div();
          target.setAttribute("id", "target");
          cell.appendChild(target);
        } else if (rowIndex === mazeHeight && colIndex === mazeWidth) {
          cell.classList.add("finish");
          cell.setAttribute("type", "finish");
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
        cell.style.borderRight = "none";
      }
    }
  }
}
