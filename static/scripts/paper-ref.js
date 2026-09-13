const index = Object.fromEntries(JSON.parse(
  document.getElementById("paper-index").textContent));

for (const el of document.querySelectorAll(".paper-ref, .paper-def")) {
  if (el.dataset.label && el.dataset.label in index) {
    el.href = index[el.dataset.label];
  } else {
    el.removeAttribute("href");
    el.classList.add("ref-broken");
  }
}
