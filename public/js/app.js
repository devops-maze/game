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
        let easy = doc.data().easy;
		    let medium = doc.data().medium;
		    let hard = doc.data().hard;
        let extreme = doc.data().extreme;
        let easyDiv=document.querySelector("#easy p");
        let mediumDiv=document.querySelector("#medium p");
        let hardDiv=document.querySelector("#hard p");
        let extremeDiv=document.querySelector("#extreme p");
        easyDiv.innerHTML=`${easy[0]} steps`;
        mediumDiv.innerHTML=`${medium[0]} steps`;
        hardDiv.innerHTML=`${hard[0]} steps`;
        extremeDiv.innerHTML=`${extreme[0]} steps`;
        console.log(easy);
		    console.log(medium);
		    console.log(hard);
		    console.log(extreme);
      } else {
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
}

/* opens the profile button */
let profiledb=document.getElementById("profile-dropdown");
function profileOnClick() {
  if(profiledb.style.display=="none") {
    profiledb.style.display="block";
  }
  else if (profiledb.style.display="block"){
    profiledb.style.display="none";
  }
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
