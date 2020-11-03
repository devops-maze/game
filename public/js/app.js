document.addEventListener("DOMContentLoaded", (event) => {
  const storage = firebase.storage();
  const storageRef = storage.ref();
  const imageRef = storageRef.child("images/deno.png");
  imageRef.getDownloadURL().then(function (url) {
    console.log(url);
    const character = document.getElementById("character");
    const img = document.createElement("img");
    img.src = url;
    character.appendChild(img);
  }).catch(function (error) {
    console.error(error);
  });
});

/*  document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
  console.log(app);

  const db = firebase.firestore();

  const productsRef = db.collection("products");

  productsRef
    .where("price", ">", 25)
    .get()
    .then((products) => {
      products.forEach((doc) => {
        let data = doc.data();
        document.write(`${data.name} at $${data.price} <br>`);
      });
    });
*/
/* Second instant refresh

  const myPost = db.collection("posts").doc("firstpost");

  myPost.onSnapshot((doc) => {
    const data = doc.data();
    document.querySelector("#title").innerHTML = data.title;
  });*/

/* DB call with instant refresh

  const db = firebase.firestore();

  const myPost = db.collection("posts").doc("firstpost");

  myPost.onSnapshot((doc) => {
    const data = doc.data();
    document.write(data.title + `<br>`);
    document.write(data.createdAt);
  });
});*/

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
      let profile=document.getElementById("profile-btn")
      let img = document.createElement("img");
      img.src = photoUrl;
      profile.appendChild(img);
      const db = firebase.firestore();
      let newHighscoreDocRef = db.collection("highscores").doc(user.email);
      let setWithMerge = newHighscoreDocRef.set({
          scores: []
        },
      { merge: true});
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

/*firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
    // User is signed in.

    /*if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("profile-btn").style.display = "none";
    

  }
});*/


function logout() {
  firebase.auth().signOut().then(function() {
    document.getElementById("profile-btn").style.display = "none";
    document.getElementById("login-btn").style.display = "block";
  }).catch(function(error) {
    console.error("Logout failed!");
  });  
  
}

function getUserScore() {
  console.log(user);
  const db = firebase.firestore();
  const userScoresRef = db.collection("highscores").doc(user.email);
  userScoresRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        // scores array
        let scores = doc.data().scores;
        console.log(scores);
      } else {
        // doc.data() will be undefined in this case
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
