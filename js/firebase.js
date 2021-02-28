// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const userCollection = db.collection("users");

function addUser(username) {
  let userRef = userCollection.doc(username);

  userRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        userCollection.doc(username).set({ friends: [], notes: [] });
      }
    })
    .catch((error) => {
      console.error("Error getting document during addUser:", error);
    });
}

function addFriend(username, friendUsername) {
  let userRef = userCollection.doc(username);
  userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        userRef.update({ friends: firebase.firestore.FieldValue.arrayUnion(friendUsername) });
      } else {
        console.error("Username does not exist on addFriend: ", username);
      }
    })
    .catch((error) => {
      console.error("Error getting document during addFriend:", error);
    });
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

addFriend("sharon washio", "chiyu");
addFriend("sharon washio", "kliu");
