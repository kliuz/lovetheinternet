// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log(firebase);

function addUser(username) {
  // return true if successful, false otherwise
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

function getUserNOtes(username, public) {
  // return notes for this user
}
