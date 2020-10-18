/* document.addEventListener("DOMContentLoaded", (event) => {
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

/*firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";


  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});
*/

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
      var user = result.user;
      document.writeln(`Hello ${user.displayName}`);
      document.writeln(`Highscore: ${user.displayHighscore}`);
      console.log(user);
    })
    .catch(console.log);
}

/*function googleLogout(){
  firebase.auth().signOut().then(function() {
  }).catch(function(error) {
    console.log(error);
  });
}*/

/* Second instant refresh
function updatePost(event) {
  const db = firebase.firestore();
  const myPost = db.collection("posts").doc("firstpost");
  myPost.update({ title: event.target.value });
}*/
