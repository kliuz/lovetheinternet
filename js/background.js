chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command == "getNotes") {
    getAllNotes(true).then(
      response => sendResponse(response)
    )
  }
  return true;
});