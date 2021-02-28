function setAddFriendAction() {
  let addFriendInput = document.getElementById("addFriendInput");
  let addFriendButton = document.getElementById("addFriendButton");

  addFriendButton.onclick = () => {
    chrome.storage.sync.get(null, (results) => {
      const username = results["username"];
      if (username == null) {
        return;
      }

      const friendUsername = addFriendInput.value;
      chrome.runtime.sendMessage({ fnName: "addFriend", fnArgs: [username, friendUsername] }, (resp) => {
        if (resp) {
          addFriendInput.value = "";
          getFriendList();
          // show success text for 3 seconds
          let confirmationText = document.getElementById("addFriendSuccessText");
          confirmationText.style.display = "block";
          setTimeout(() => confirmationText.style.display = "none", 3000);
        } else {
          // TODO: add failure text
        }
      });
    });
  };
}

function getFriendList() {
  chrome.storage.sync.get(null, (results) => {
    const username = results["username"];
    if (username == null) {
      return;
    }

    chrome.runtime.sendMessage({ fnName: "getUserFriends", fnArgs: [username] }, (resp) => {
      let friendList = document.getElementById("friendList");
      friendList.innerHTML = "";
      for (const friendUsername of resp) {
        let friendDiv = document.createElement("div");
        friendDiv.classList.add("friend");
        friendDiv.innerHTML = friendUsername;
      
        friendList.appendChild(friendDiv);
      }
    });
  });
}

setAddFriendAction()
getFriendList()