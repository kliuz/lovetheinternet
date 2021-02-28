function getMainContent() {
  // clear new user experience for rerendering
  let nux = document.getElementById("nux");
  nux.innerHTML = "";

  chrome.storage.sync.get(null, results => {
    if (results["username"] == null) {
      getContentForNewUser();
    } else {
      showContent();
    }
  })
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
  }
  
  buttonGroupDiv.appendChild(input);
  buttonGroupDiv.appendChild(save);
  nux.appendChild(buttonGroupDiv)
}

// @param (string) username: username entered by the user
function saveUserName(username) {
  chrome.storage.sync.set({username: username}, getMainContent);
}

getMainContent();