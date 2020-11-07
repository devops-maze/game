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
let profiledb = document.getElementById("profile-dropdown");
function profileOnClick() {
  if (profiledb.style.display == "none") {
    profiledb.style.display = "block";
  } else if ((profiledb.style.display = "block")) {
    profiledb.style.display = "none";
  }
}
