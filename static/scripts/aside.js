function getAsideState(label) {
  if (!localStorage.getItem("asideStates")) {
    localStorage.setItem("asideStates", "{}");
  }
  const asideStates = new Map(Object.entries(JSON.parse(localStorage.getItem("asideStates"))));
  if (!asideStates.has(label)) {
    return false;
  }
  return asideStates.get(label);
}
function updateAsideState(label, open) {
  const asideStates = new Map(Object.entries(JSON.parse(localStorage.getItem("asideStates"))));
  asideStates.set(label, open);
  localStorage.setItem("asideStates", JSON.stringify(Object.fromEntries(asideStates)));
}

for (const el of document.getElementsByClassName("aside")) {
  const label = el.getElementsByTagName("summary")[0].innerText;
  el.open = getAsideState(label);
  el.addEventListener("toggle", function() {
    updateAsideState(label, el.open);
  });
}
