// get elements
let friendsNotesTab = document.getElementById("friendsNotesTab");
let publicNotesTab = document.getElementById("publicNotesTab");

const NotesTabEnum = Object.freeze({
  friends: 1,
  public: 2,
});

// @params (NotesTabsEnum) tab: update UI for selected currentTab
function makeCurrentNotesTab(tab) {
  const currentClassName = "current";
  switch (tab) {
    case TabEnum.friends:
      friendsNotesTab.classList.add(currentClassName);
      publicNotesTab.classList.remove(currentClassName);
      return;
    case TabEnum.public:
      friendsNotesTab.classList.remove(currentClassName);
      publicNotesTab.classList.add(currentClassName);
      return;
    default:
      return;
  }
}

function getFriendsNotes() {
  chrome.storage.sync.get(null, (results) => {
    const username = results["username"];
    if (username == null) {
      return;
    }

    chrome.runtime.sendMessage({ fnName: "getFriendsNotes", fnArgs: [username] }, (resp) => {
      for (note of resp) {
        addNoteToSection(note["username"], note["note"]["note"], note["note"]["url"])
      }
    });
  });
}

// TODO: add timestamp
function addNoteToSection(username, note, url) {
  let notesSection = document.getElementById("notesSection")
  let noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.innerHTML = "<b>"+ username + ": </b> \"" + note + "\", <u><i> " + url + "</i></u>";

  notesSection.appendChild(noteDiv);
}

friendsNotesTab.onclick = () => makeCurrentNotesTab(TabEnum.friends);
publicNotesTab.onclick = () => makeCurrentNotesTab(TabEnum.public);

makeCurrentNotesTab(TabEnum.friends);
getFriendsNotes();
