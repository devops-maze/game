let user;

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      user = result.user;
      getUser();
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("logout-btn").style.display = "block";
      /*document.write(`Hello ${user.displayName}`);
      console.log(user);*/
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
    })
    .catch(function (error) {
      console.error("Logout failed!");
    });
}

function getUser() {
  console.log(user);
  const db = firebase.firestore();
  const userScoresRef = db.collection("highscores").doc(user.email);
  userScoresRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        let scores = doc.data().scores;
        console.log(scores);
      } else {
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}
