const mazeFun = require("./maze");
const $ = require("jquery");

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
      document.getElementById("logout-btn").style.display = "block";
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
      document.getElementById("profile-dropdown").style.display = "none";
      const myNode = document.getElementById("matches");
      while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
      }
      let image = document.getElementById("profile-image");
      image.parentNode.removeChild(image);
    })
    .catch(function (error) {
      console.error("Logout failed!");
    });
}

function writeHighscores() {
  const db = firebase.firestore();
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

function updateDoc(maze) {
  const db = firebase.firestore();
  if (user != null) {
    let newHighscoreDocRef = db.collection("highscores").doc(user.email);
    if (maze.dimensions === 5) {
      newHighscoreDocRef.update({
        easy: firebase.firestore.FieldValue.arrayUnion(maze.steps),
      });
    } else if (maze.dimensions === 10) {
      newHighscoreDocRef.update({
        medium: firebase.firestore.FieldValue.arrayUnion(maze.steps),
      });
    } else if (maze.dimensions === 20) {
      newHighscoreDocRef.update({
        hard: firebase.firestore.FieldValue.arrayUnion(maze.steps),
      });
    } else if (maze.dimensions === 25) {
      newHighscoreDocRef.update({
        extreme: firebase.firestore.FieldValue.arrayUnion(maze.steps),
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

// maze to firestore
const mazeConverter = {
  toFirestore: function (maze) {
    return { dimensions: maze.dimensions, path: maze.path };
  },
};

function newMazeToFirestore(maze) {
  const db = firebase.firestore();
  if (user != null) {
    let newMazeRef = db.collection("highscores").doc(user.email);
    if (maze.dimensions == 5) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: maze.steps,
          time: maze.formattedTime,
        }),
      });
    } else if (maze.dimensions == 10) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: maze.steps,
          time: maze.formattedTime,
        }),
      });
    }
    if (maze.dimensions == 20) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: maze.steps,
          time: maze.formattedTime,
        }),
      });
    }
    if (maze.dimensions == 25) {
      newMazeRef.withConverter(mazeConverter).update({
        mazes: firebase.firestore.FieldValue.arrayUnion({
          dimensions: maze.dimensions,
          path: maze.path,
          steps: maze.steps,
          time: maze.formattedTime,
        }),
      });
    }
  }
}

//match-history preview
function writeMatchHistory() {
  let mazes = [];
  const db = firebase.firestore();
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
  //difIcon.innerHTML = "&#128585; :";
  const pDif = document.createElement("p");
  if (maze.dimensions == 5) {
    difIcon.innerHTML = "&#127853; :";
    pDif.innerHTML = "Easy";
  }
  if (maze.dimensions == 10) {
    difIcon.innerHTML = "&#128585; :";
    pDif.innerHTML = "Medium";
  }
  if (maze.dimensions == 20) {
    difIcon.innerHTML = "&#129409; :";
    pDif.innerHTML = "Hard";
  }
  if (maze.dimensions == 25) {
    difIcon.innerHTML = "&#128121; :";
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
  updateDoc,
  newMazeToFirestore,
};
