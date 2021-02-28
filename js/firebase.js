// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const userCollection = db.collection("users");

// eventually returns true if username was added, false otherwise
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

// eventually returns true if friend was added, false otherwise
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

// eventually returns true if note was added, false otherwise
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

// eventually returns array of usernames
function getUserFriends(username) {
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

// eventually returns an array of public note objects
// public note objects are structured like:
// {
//   "username": "obama",
//   "note": note
// }
// note has the same structure as the notes returned by getUserNotes
function getPublicNotes() {
  return userCollection
    .get()
    .then((querySnapshot) => {
      let publicNotes = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        getUserNotes(doc.id, true)
          .then((notes) =>
            notes.forEach((note) =>
              publicNotes.push({ username: doc.id, note: note })
            )
          )
          .catch((error) =>
            console.error("Couldn't get public notes for: ", doc.id)
          );
      });
      return publicNotes;
    })
    .catch((error) => {
      console.log("Error getting documents during getPublicNotes: ", error);
      return Promise.reject("Error getting document during getPublicNotes");
    });
}

// eventually returns an array of user notes
// notes are structured like:
// {
//   "note": "example note",
//   "url": "nytimes.com/2021/02/27/health/covid-vaccine-johnson-and-johnson.html",
//   "public": false,
//   "timestamp": {
//     "seconds": 1614495207,
//     "nanoseconds": 602000000,
//   }
// }
function getUserNotes(username, public) {
  let userRef = userCollection.doc(username);
  let noteRef = userRef.collection("notes");

  return noteRef
    .where("public", "==", public)
    .get()
    .then((querySnapshot) => {
      let notes = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        notes.push(doc.data());
      });
      return notes;
    })
    .catch((error) => {
      console.log("Error getting documents during getUserNotes: ", error);
      return Promise.reject(
        "Error getting document during getUserNotes: ",
        username
      );
    });
}

// addUser("sharon").then((success) => console.log(success));

// addNote(
//   "kliu",
//   "wsj.com/1923834712",
//   "stonks",
//   true
// ).then((success) => console.log(success));

// addFriend("kliu", "chi").then((s) => console.log(s));
// addFriend("kliu", "sharo").then((s) => console.log(s));

// getUserFriends("kliu").then((doc) => console.log(doc));

// getUserNotes("kliu", true).then((docs) => {
//   console.log(docs);
// });

// getPublicNotes().then((s) => console.log(s));