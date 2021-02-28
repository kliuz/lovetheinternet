// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const userCollection = db.collection("users");

function addUser(username) {
  let userRef = userCollection.doc(username);

  return userRef
    .get()
    .then((doc) => {
      if (!doc.exists) {
        userCollection.doc(username).set({ friends: [] });
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error getting document during addUser:", error);
      return Promise.reject(
        "Error getting document during addUser: ",
        username
      );
    });
}

function addFriend(username, friendUsername) {
  let userRef = userCollection.doc(username);

  return userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        userRef.update({
          friends: firebase.firestore.FieldValue.arrayUnion(friendUsername),
        });
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error getting document during addFriend:", error);
      return Promise.reject(
        "Error getting document during addFriend: ",
        username
      );
    });
}

function addNote(username, url, note, public) {
  let userRef = userCollection.doc(username);

  return userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        userRef.collection("notes").add({
          url: url,
          note: note,
          public: public,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("Error getting document during addNote:", error);
      return Promise.reject(
        "Error getting document during addNote: ",
        username
      );
    });
}

function getUserFriends(username) {
  // return array of usernames
  let userRef = userCollection.doc(username);

  return userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data().friends;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error("Error getting document during getAllUserFriends:", error);
      return Promise.reject(
        "Error getting document during getAllUserFriends: ",
        username
      );
    });
}

function getPublicNotes() {
  // return all public notes
}

function getUserNotes(username, public) {
  // return notes for this user
}

// addUser("sharon").then((success) => console.log(success));
// addNote(
//   "sharon",
//   "ow.com",
//   "this website is great",
//   true
// ).then((success) => console.log(success));
// addFriend("sharon", "kevin").then((s) => console.log(s));
getUserFriends("sharon").then((doc) => console.log(doc));
