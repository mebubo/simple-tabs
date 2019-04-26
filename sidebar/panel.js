var myWindowId;
const contentBox = document.querySelector("#content");

function createTab(tab) {
  const t = document.createElement("div");
  t.classList.add("tab")
  if (tab.active) {
    t.classList.add("active");
  }
  t.innerHTML = `${tab.title}`;
  t.addEventListener("click", () => browser.tabs.update(tab.id, {active: true}));
  return t
}

function drawTabs(tabs) {
  const els = tabs.map(createTab);
  contentBox.innerHTML = '';
  contentBox.append(...els);
}

function updateContent() {
  browser.tabs.query({windowId: myWindowId}).then(drawTabs);
}

browser.tabs.onActivated.addListener(updateContent);
browser.tabs.onUpdated.addListener(updateContent);
browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});
