window.addEventListener("DOMContentLoaded", (event) => {
  createBlankMaze();
});
let mazeWidth = 10;
let mazeHeight = 10;

function createBlankMaze() {
  removeMaze();
  var rowIndex, colIndex;

  var table = document.createElement("table");
  var tbody = document.createElement("tbody");

  for (rowIndex = 1; rowIndex <= mazeHeight; rowIndex++) {
    var row = document.createElement("tr");

    for (colIndex = 1; colIndex <= mazeWidth; colIndex++) {
      var col = document.createElement("td");

      if (rowIndex == 1 && colIndex == 1) {
        col.className = "start";
        col.setAttribute("type", "start");
      } else if (rowIndex == mazeHeight && colIndex == mazeWidth) {
        col.className = "finish";
        col.setAttribute("type", "finish");
      } else {
        col.className = "cell";
      }
      col.setAttribute("id", "cell_" + rowIndex + "_" + colIndex);

      row.appendChild(col);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);

  let mazeCanvas = document.getElementById("maze-canvas");
  mazeCanvas.appendChild(table);
  mazeCanvas.firstElementChild.setAttribute("id", "maze");
  createGaps();
}

function removeMaze() {
  let elem = document.getElementById("maze");

  if (elem != null) {
    elem.parentNode.removeChild(elem);
  }
}

function createGaps() {
  for (let colIndex = 1; colIndex <= mazeWidth - 1; colIndex++) {
    let randomGap = Math.floor(Math.random() * 9) + 1;
    for (let rowIndex = 1; rowIndex <= mazeHeight; rowIndex++) {
      if (randomGap == rowIndex) {
        let cell = document.getElementById("cell_" + rowIndex + "_" + colIndex);
        cell.style.borderRight = "none";
        console.log("got one!");
      }
    }
  }
}

