function createNotesSection() {
  let notesSectionDiv = document.createElement("div");
  notesSectionDiv.id = "memoments-notes-section";
  
  if (document.body.firstElementChild != null) {
    document.body.insertBefore(notesSectionDiv, document.body.firstElementChild);
  }

  return notesSectionDiv;
}

// @param (string) user: user who made the note
// @param (string) content: content of the note
// @param (string) id: id of the note html element
function getNewNote(user, content, id) {
  // don't create elements with duplicate ids
  if (document.getElementById(id) != null) {
    console.log("DUPLICATE IDs");
    return;
  }

  let noteDiv = document.createElement("div");
  noteDiv.classList.add("memoments-note");
  noteDiv.id = id;
  noteDiv.innerHTML = "<b>" + user + ":</b> " + content
  
  let notesSectionDiv = document.getElementById("memoments-notes-section")

  if (notesSectionDiv == null) {
    notesSectionDiv = createNotesSection()
  }

  notesSectionDiv.appendChild(noteDiv);

  let buttonDiv = document.createElement("span");
  buttonDiv.classList.add("memoments-close-button");
  let buttonContent = document.createTextNode("x")
  buttonDiv.appendChild(buttonContent);

  buttonDiv.onclick = () => {
    noteDiv.style.display = "none";
  }

  noteDiv.appendChild(buttonDiv);
}

chrome.runtime.sendMessage({command: "getNotes", url: location.href}, response => {
  console.log("response", response)
  for (index in response) {
    let username = response[index]["username"];
    let note = response[index]["note"]["note"];
    getNewNote(username, note, username + "-" + index);
  }
});