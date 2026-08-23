function getAsideState(label) {
  if (!localStorage.getItem("detailsStates")) {
    localStorage.setItem("detailsStates", "{}");
  }
  const detailsStates = new Map(
    Object.entries(JSON.parse(localStorage.getItem("detailsStates"))),
  );
  if (!detailsStates.has(label)) {
    return false;
  }
  return detailsStates.get(label);
}
function updateAsideState(label, open) {
  const detailsStates = new Map(
    Object.entries(JSON.parse(localStorage.getItem("detailsStates"))),
  );
  detailsStates.set(label, open);
  localStorage.setItem(
    "detailsStates",
    JSON.stringify(Object.fromEntries(detailsStates)),
  );
}

for (const el of document.getElementsByClassName("details")) {
  const label = el.getElementsByTagName("summary")[0].innerText;
  el.open = getAsideState(label);
  el.addEventListener("toggle", function () {
    updateAsideState(label, el.open);
  });
}
