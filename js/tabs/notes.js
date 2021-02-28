// get elements
let friendsNotesTab = document.getElementById("friendsNotesTab");
let publicNotesTab = document.getElementById("publicNotesTab");
let visualizationTab = document.getElementById("visualizationTab");

const NotesTabEnum = Object.freeze({
  friends: 1,
  public: 2,
});

// for caching
let friendsNotes = null;
let publicNotes = null;

// @params (NotesTabsEnum) tab: update UI for selected currentTab
function makeCurrentNotesTab(tab) {
  const currentClassName = "current";
  switch (tab) {
    case TabEnum.friends:
      friendsNotesTab.classList.add(currentClassName);
      publicNotesTab.classList.remove(currentClassName);
      getFriendsNotes();
      return;
    case TabEnum.public:
      friendsNotesTab.classList.remove(currentClassName);
      publicNotesTab.classList.add(currentClassName);
      getPublicNotes();
      return;
    default:
      return;
  }
}

function getFriendsNotes() {
  if (friendsNotes != null) {
    clearAndAddNotesInSection(friendsNotes);
    return;      
  }

  chrome.storage.sync.get(null, (results) => {
    const username = results["username"];
    if (username == null) {
      return;
    }

    chrome.runtime.sendMessage({ fnName: "getFriendsNotes", fnArgs: [username] }, (resp) => {
      friendsNotes = resp;
      clearAndAddNotesInSection(resp);
    });
  });
}

function getPublicNotes() {
  if (publicNotes != null) {
    clearAndAddNotesInSection(publicNotes);
    return;      
  }

  chrome.storage.sync.get(null, (results) => {
    const username = results["username"];
    if (username == null) {
      return;
    }

    chrome.runtime.sendMessage({ fnName: "getAllNotes", fnArgs: [true /*public*/] }, (resp) => {
      publicNotes = resp;
      clearAndAddNotesInSection(resp);
    });
  });
}

function clearAndAddNotesInSection(notes) {
  document.getElementById("notesSection").innerHTML = "";
  for (note of notes) {
    addNoteToSection(note["username"], note["note"]["note"], note["note"]["url"])
  }
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
visualizationTab.onclick = () => chrome.tabs.create({active: true, url: "visualization.html"});

makeCurrentNotesTab(TabEnum.friends);
