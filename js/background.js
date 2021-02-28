chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command == "getNotes") {
    getPublicNotesForSite(request.url).then(
      response => sendResponse(response)
    )
  }
  return true;
});

// @param (string) url: url of the site to get notes from
function getPublicNotesForSite(url) {
  return getPublicNotes().then(
    notes => notes.filter(entry => entry["note"]["url"] === url)
  )
}