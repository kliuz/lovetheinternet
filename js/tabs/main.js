function getMainContent() {
  // clear new user experience for rerendering
  let nux = document.getElementById("nux");
  nux.innerHTML = "";

  chrome.storage.sync.get(null, (results) => {
    let username = results["username"];
    if (username == null) {
      getContentForNewUser();
    } else {
      let mainContent = document.getElementById("mainContent");

      let welcomeDiv = document.createElement("h2");
      welcomeDiv.innerHTML = "Hello, <span>" + username + "</span>!";

      mainContent.insertBefore(welcomeDiv, mainContent.firstElementChild);

      showContent();
    }
  });
}

function showContent() {
  let contents = document.getElementsByClassName("content");
  for (let content of contents) {
    content.style.display = "block";
  }
}

function getContentForNewUser() {
  let nux = document.getElementById("nux");

  let buttonGroupDiv = document.createElement("div");
  buttonGroupDiv.classList.add("buttonGroup");

  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your username...";

  let save = document.createElement("button");
  save.innerText = "Save";
  save.onclick = () => {
    saveUserName(input.value);
    input.value = "";
  };

  buttonGroupDiv.appendChild(input);
  buttonGroupDiv.appendChild(save);
  nux.appendChild(buttonGroupDiv);
}

// @param (string) username: username entered by the user
function saveUserName(username) {
  chrome.runtime.sendMessage({ fnName: "addUser", fnArgs: [username] }, (resp) => {
    console.log(resp);
  });
  chrome.storage.sync.set({ username: username }, getMainContent);
}

function setAddNoteAction() {
  let addNoteInput = document.getElementById("addNoteInput");
  let addNoteButton = document.getElementById("addNoteButton");

  addNoteButton.onclick = () => {
    chrome.storage.sync.get(null, (results) => {
      if (results["username"] == null) {
        return;
      }

      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url; // TODO: if this is null, tell user
        let note = addNoteInput.value;
        let username = results["username"];
        let public = !document.getElementById("privateCheckbox").checked;

        chrome.runtime.sendMessage({ fnName: "addNote", fnArgs: [username, url, note, public] }, (resp) => {
          if (resp) {
            addNoteInput.value = ""

            // show success text for 3 seconds
            let confirmationText = document.getElementById("addNoteSuccessText");
            confirmationText.style.display = "block";
            setTimeout(() => confirmationText.style.display = "none", 3000);
          } else {
            // TODO: add failure text
          }
        });
      });
    });
  };
}

setAddNoteAction();
getMainContent();
