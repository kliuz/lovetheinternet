// get elements
let mainTab = document.getElementById("mainTab");
let friendsTab = document.getElementById("friendsTab");
let notesTab = document.getElementById("notesTab");

let mainPage = document.getElementById("mainPage");
let friendsPage = document.getElementById("friendsPage");
let notesPage = document.getElementById("notesPage");

const TabEnum = Object.freeze({
  main: 1,
  friends: 2,
  notes: 3,
});

// @params (TabsEnum) tab: update UI for selected currentTab
function makeCurrent(tab) {
  const currentClassName = "current";
  switch (tab) {
    case TabEnum.main:
      mainTab.classList.add(currentClassName);
      friendsTab.classList.remove(currentClassName);
      notesTab.classList.remove(currentClassName);
      mainPage.style.display = "block";
      friendsPage.style.display = "none";
      notesPage.style.display = "none";
      return;
    case TabEnum.friends:
      mainTab.classList.remove(currentClassName);
      friendsTab.classList.add(currentClassName);
      notesTab.classList.remove(currentClassName);
      mainPage.style.display = "none";
      friendsPage.style.display = "block";
      notesPage.style.display = "none";
      return;
    case TabEnum.notes:
      mainTab.classList.remove(currentClassName);
      friendsTab.classList.remove(currentClassName);
      notesTab.classList.add(currentClassName);
      mainPage.style.display = "none";
      friendsPage.style.display = "none";
      notesPage.style.display = "block";
      return;
    default:
      return;
  }
}

mainTab.onclick = () => makeCurrent(TabEnum.main);
friendsTab.onclick = () => makeCurrent(TabEnum.friends);
notesTab.onclick = () => makeCurrent(TabEnum.notes);

makeCurrent(TabEnum.main);
