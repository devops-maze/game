/*function createNewMaze(mazeDimensions) {
  charPos = "";
  posY = 1;
  posX = 1;
  steps = 0;

  let div = () => document.createElement("div");
  const mazeCanvas = document.getElementById("maze-canvas");

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
        cell.setAttribute("type", "start");
        let character = div();
        character.setAttribute("id", "character");
        cell.appendChild(character);
      } else if (rowIndex === mazeDimensions && colIndex === mazeDimensions) {
        cell.classList.add("finish");
        cell.setAttribute("type", "finish");
        let target = div();
        target.setAttribute("id", "target");
        cell.appendChild(target);
      }
      cell.classList.add("maze-cell");
      cell.setAttribute("id", `cell_${rowIndex}_${colIndex}`);

      column.appendChild(cell);
      row.appendChild(column);
    }
    maze.appendChild(row);
  }
  mazeCanvas.appendChild(maze);
}

function removeMaze() {
  let elem = document.getElementById("maze");

  if (elem != null) {
    elem.parentNode.removeChild(elem);
  }
}

function createGaps(mazeDimensions) {
  for (let colIndex = 1; colIndex <= mazeDimensions - 1; colIndex++) {
    let randomGap = Math.floor(Math.random() * mazeDimensions) + 1;
    for (let rowIndex = 1; rowIndex <= mazeDimensions; rowIndex++) {
      if (randomGap == rowIndex) {
        let cell = document.getElementById(`cell_${rowIndex}_${colIndex}`);
        cell.classList.add("gap");
      }
    }
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
/*function addDocument(){
  let newHighscoreDocRef = db.collection("highscores").doc(user.email);
  let setWithMerge = newHighscoreDocRef.set({
    scores: []
  },
  { merge: true});
}

let charPos;
let posY;
let posX;
let steps;

function moveCharacter(e) {
  e = e || window.event;
  const character = document.getElementById("character");
  let mazeDimensions = document.getElementById("maze").children.length;

  const isGap = (y, x) => {
    if (y < 1 || x < 1 || y > mazeDimensions || x > mazeDimensions) {
      return console.log(`Out of bounds! 🔥`);
    } else {
      return document.getElementById(`cell_${y}_${x}`).classList.contains("gap");
    }
  };

  if (e.keyCode == "38" && posY > 1) {
    posY--;
  } else if (e.keyCode == "40" && posY < mazeDimensions) {
    posY++;
  } else if (e.keyCode == "37" && posX > 1 && isGap(posY, posX - 1)) {
    posX--;
  } else if (e.keyCode == "39" && posX < mazeDimensions && isGap(posY, posX)) {
    posX++;
  }
  steps++;
  charPos = `cell_${posY}_${posX}`;

  character.parentNode.removeChild(character);
  document.getElementById(charPos).appendChild(character);
  checkWinCondition(charPos);
}

function checkWinCondition(pos) {
  if (document.getElementById(pos).classList.contains("finish")) {
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

function updateDoc() {
  if (user != null) {
    let newHighscoreDocRef = db.collection("highscores").doc(user.email);
    if (mazeDimensions.value == 5) {
      newHighscoreDocRef.update({
        easy: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    } else if (mazeDimensions.value == 10) {
      newHighscoreDocRef.update({
        medium: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    } else if (mazeDimensions.value == 20) {
      newHighscoreDocRef.update({
        hard: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    } else {
      newHighscoreDocRef.update({
        extreme: firebase.firestore.FieldValue.arrayUnion(steps),
      });
    }
    writeHighscores();
  }
}
*/
const db = firebase.firestore();
//new maze to firestore
class Maze {
  constructor(dimensions, path) {
    this.dimensions = dimensions;
    this.path = path;
  }
}
let array1 = [
  "cell_1_1",
  "cell_2_1",
  "cell_2_2",
  "cell_2_3",
  "cell_1_3",
  "cell_1_2",
  "cell_1_3",
  "cell_1_4",
  "cell_1_5",
  "cell_1_6",
  "cell_1_7",
  "cell_1_8",
  "cell_2_8",
  "cell_3_8",
  "cell_3_9",
  "cell_2_9",
  "cell_2_10",
  "cell_1_10",
  "cell_1_9",
  "cell_2_10",
  "cell_3_10",
  "cell_4_10",
  "cell_5_10",
  "cell_6_10",
  "cell_7_10",
  "cell_8_10",
  "cell_8_9",
  "cell_9_9",
  "cell_9_10",
  "cell_10_10",
  "cell_10_9",
  "cell_10_8",
  "cell_9_8",
  "cell_9_7",
  "cell_9_6",
  "cell_10_6",
  "cell_10_5",
  "cell_9_5",
  "cell_9_4",
  "cell_8_4",
  "cell_7_4",
  "cell_7_3",
  "cell_7_2",
  "cell_7_1",
  "cell_8_1",
  "cell_8_2",
  "cell_9_2",
  "cell_9_1",
  "cell_10_1",
  "cell_10_2",
  "cell_10_3",
  "cell_10_4",
  "cell_10_3",
  "cell_9_3",
  "cell_8_3",
  "cell_9_3",
  "cell_8_2",
  "cell_7_1",
  "cell_6_1",
  "cell_6_2",
  "cell_6_3",
  "cell_6_4",
  "cell_6_5",
  "cell_7_5",
  "cell_8_5",
  "cell_8_6",
  "cell_8_7",
  "cell_7_7",
  "cell_7_8",
  "cell_7_9",
  "cell_6_9",
  "cell_6_8",
  "cell_5_8",
  "cell_5_9",
  "cell_4_9",
  "cell_4_8",
  "cell_4_7",
  "cell_5_7",
  "cell_5_6",
  "cell_4_6",
  "cell_3_6",
  "cell_3_7",
  "cell_2_7",
  "cell_2_6",
  "cell_2_5",
  "cell_3_5",
  "cell_3_4",
  "cell_2_4",
  "cell_3_4",
  "cell_4_4",
  "cell_5_4",
  "cell_5_3",
  "cell_4_3",
  "cell_4_2",
  "cell_3_2",
  "cell_3_3",
  "cell_3_2",
  "cell_3_1",
  "cell_4_1",
  "cell_5_1",
  "cell_5_2",
  "cell_5_1",
  "cell_4_3",
  "cell_5_4",
  "cell_5_5",
  "cell_4_5",
  "cell_5_5",
  "cell_5_4",
  "cell_2_5",
  "cell_2_6",
  "cell_2_7",
  "cell_3_7",
  "cell_4_6",
  "cell_5_6",
  "cell_6_6",
  "cell_7_6",
  "cell_6_6",
  "cell_6_7",
  "cell_4_8",
  "cell_5_9",
  "cell_6_8",
  "cell_6_9",
  "cell_7_9",
  "cell_7_8",
  "cell_8_8",
  "cell_7_5",
  "cell_6_4",
  "cell_6_2",
  "cell_9_5",
  "cell_10_6",
  "cell_10_7",
];

let array2 = [
  "cell_1_1",
  "cell_2_1",
  "cell_3_1",
  "cell_3_2",
  "cell_4_2",
  "cell_4_1",
  "cell_5_1",
  "cell_6_1",
  "cell_7_1",
  "cell_8_1",
  "cell_8_2",
  "cell_7_2",
  "cell_7_3",
  "cell_8_3",
  "cell_8_4",
  "cell_9_4",
  "cell_9_5",
  "cell_9_6",
  "cell_10_6",
  "cell_10_5",
  "cell_10_4",
  "cell_10_3",
  "cell_10_2",
  "cell_10_1",
  "cell_9_1",
  "cell_9_2",
  "cell_9_3",
  "cell_9_2",
  "cell_10_4",
  "cell_10_5",
  "cell_10_6",
  "cell_10_7",
  "cell_10_8",
  "cell_10_9",
  "cell_9_9",
  "cell_9_8",
  "cell_8_8",
  "cell_8_7",
  "cell_9_7",
  "cell_8_7",
  "cell_7_7",
  "cell_6_7",
  "cell_6_6",
  "cell_5_6",
  "cell_4_6",
  "cell_4_7",
  "cell_5_7",
  "cell_5_8",
  "cell_6_8",
  "cell_7_8",
  "cell_7_9",
  "cell_7_10",
  "cell_6_10",
  "cell_6_9",
  "cell_5_9",
  "cell_4_9",
  "cell_4_10",
  "cell_5_10",
  "cell_4_10",
  "cell_3_10",
  "cell_3_9",
  "cell_2_9",
  "cell_2_10",
  "cell_1_10",
  "cell_1_9",
  "cell_1_8",
  "cell_2_8",
  "cell_3_8",
  "cell_4_8",
  "cell_3_8",
  "cell_3_7",
  "cell_2_7",
  "cell_2_6",
  "cell_1_6",
  "cell_1_7",
  "cell_1_6",
  "cell_1_5",
  "cell_1_4",
  "cell_1_3",
  "cell_2_3",
  "cell_2_2",
  "cell_1_2",
  "cell_2_3",
  "cell_2_4",
  "cell_3_4",
  "cell_4_4",
  "cell_4_5",
  "cell_5_5",
  "cell_6_5",
  "cell_6_4",
  "cell_5_4",
  "cell_5_3",
  "cell_4_3",
  "cell_3_3",
  "cell_4_3",
  "cell_5_3",
  "cell_6_3",
  "cell_6_2",
  "cell_5_2",
  "cell_6_2",
  "cell_6_3",
  "cell_6_4",
  "cell_7_4",
  "cell_7_5",
  "cell_8_5",
  "cell_8_6",
  "cell_7_6",
  "cell_8_5",
  "cell_7_5",
  "cell_7_4",
  "cell_6_5",
  "cell_4_5",
  "cell_3_5",
  "cell_2_5",
  "cell_3_5",
  "cell_3_6",
  "cell_4_5",
  "cell_2_4",
  "cell_2_7",
  "cell_3_7",
  "cell_2_8",
  "cell_7_10",
  "cell_8_10",
  "cell_9_10",
  "cell_10_10",
  "cell_8_10",
  "cell_8_9",
];
let maze = new Maze(10, array1);

const mazeConverter = {
  toFirestore: function (maze) {
    return { dimensions: maze.dimensions, path: maze.path };
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options);
    return new maze(data.dimensions, data.path);
  },
};

function newMazeToFirestore() {
  if (user != null) {
    let newMazeRef = db.collection("highscores").doc(user.email);
    if (maze.dimensions == 5) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
        }),
      });
    } else if (maze.dimensions == 10) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
        }),
      });
    }
    if (maze.dimensions == 20) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
        }),
      });
    }
    if (maze.dimensions == 25) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
        }),
      });
    }
  }
}
