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

          easyDiv.innerHTML = `${Math.min(...easy)} steps`;
          mediumDiv.innerHTML = `${Math.min(...medium)} steps`;
          hardDiv.innerHTML = `${Math.min(...hard)} steps`;
          extremeDiv.innerHTML = `${Math.min(...extreme)} steps`;
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
              mazes.push(new Maze(obj.dimensions, obj.path));
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
  const score = div();
  score.classList.add("score");
  const scoreIcon = div();
  scoreIcon.classList.add("icon");
  scoreIcon.innerHTML = "&#127942; :";
  const pScore = document.createElement("p");
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
  createBlankMaze(maze.dimensions, `maze-map-${i}`);
  generateMazeFromPath(maze.path);
}
