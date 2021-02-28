// @param (string) content: content of the note
// @param (string) id: id of the note html element
function getNewNote(content, id) {
  // don't create elements with duplicate ids
  if (document.getElementById(id) != null) {
    console.log("DUPLICATE IDs");
    return;
  }

  let noteDiv = document.createElement("div");
  noteDiv.classList.add("friendnote-note");
  noteDiv.id = id;
  let noteContent = document.createTextNode(content);
  noteDiv.appendChild(noteContent);
  
  if (document.body.firstElementChild != null) {
    document.body.insertBefore(noteDiv, document.body.firstElementChild);
  }

  appendCloseButton(id);
}

// @param (string) id: id of the html element to close
function appendCloseButton(id) {
  targetElement = document.getElementById(id);
  if (targetElement == null) {
    return;
  }

  let buttonDiv = document.createElement("span");
  buttonDiv.classList.add("friendnote-close-button");
  let buttonContent = document.createTextNode("x")
  buttonDiv.appendChild(buttonContent);

  buttonDiv.onclick = () => {
    targetElement.style.display = "none";
  }

  targetElement.appendChild(buttonDiv);
}

getNewNote("Placeholder Note!", "test");