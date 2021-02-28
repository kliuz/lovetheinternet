// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

function addUser(username) {
  let collection = db.collection("users");
  let userRef = db.collection("users").doc(username);

  userRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        collection.doc(username).set({ friends: [], notes: [] });
        success = true;
      }
    })
    .catch((error) => {
      console.error("Error getting document during addUser:", error);
    });
}

function addFriend(username, friendUsername) {
  // return true if successful, false otherwise
}

function addNote(username, url, note, public) {
  // return true if successful, false otherwise
}

function getUser(username) {
  // return document for this user
}

function getAllUserFriends(username) {
  // return array of usernames
}

function getPublicNotes() {
  // return all public notes
}

function getUserNotes(username, public) {
  // return notes for this user
}

console.log(addUser('sharon washio'));
