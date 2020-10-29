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

/* Google Login

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
      console.log(user);
    })
    .catch(console.log);
}*/

/* Second instant refresh
function updatePost(event) {
  const db = firebase.firestore();
  const myPost = db.collection("posts").doc("firstpost");
  myPost.update({ title: event.target.value });
}*/
