// document.addEventListener("DOMContentLoaded", (event) => {
//   const app = firebase.app();

//   function showimage() {
//     const storage = firebase.storage();
//     const storageRef = storage.ref();
//     var spaceRef = storageRef.child("images/deno.png");
//   }
// });

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
    document.getElementById("logout-btn").style.display = "none";
    

  }
});*/


function logout() {
  firebase.auth().signOut().then(function() {
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("login-btn").style.display = "block";
  }).catch(function(error) {
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



/* Second instant refresh
function updatePost(event) {
  const db = firebase.firestore();
  const myPost = db.collection("posts").doc("firstpost");
  myPost.update({ title: event.target.value });
}*/
