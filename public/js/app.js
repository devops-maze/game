/* Google Login */
let user,name,email,photoUrl;


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
      getUserScore();
      let profile=document.getElementById("profile-btn");
      let img = document.createElement("img");
      img.setAttribute("id","profile-image");
      img.src = photoUrl;
      profile.appendChild(img);
      document.getElementById("login-btn").style.display = "none";
      document.getElementById("profile-btn").style.display = "block";
      /*document.write(`Hello ${user.displayName}`);
      console.log(user);*/
      console.log("  Name: " + name);
      console.log("  Email: " + email);
      console.log("  Photo URL: " + photoUrl);
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

function getUserScore() {
  console.log(user);
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

/* opens the profile button */

function profileOnClick() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//closes the profile button

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("profile-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* Second instant refresh
function updatePost(event) {
  const db = firebase.firestore();
  const myPost = db.collection("posts").doc("firstpost");
  myPost.update({ title: event.target.value });
}*/
