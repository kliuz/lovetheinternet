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

friendsNotesTab.onclick = () => makeCurrentNotesTab(TabEnum.friends);
publicNotesTab.onclick = () => makeCurrentNotesTab(TabEnum.public);

makeCurrentNotesTab(TabEnum.friends);
