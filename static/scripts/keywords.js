// Rewrites [[term]] and [[term|display]] in the page text into links to
// wherever that term is defined. Zola passes the brackets through untouched, so
// the rewrite has to happen here rather than at build time.
//
// Loaded after katex.js in base.html, see the comment there.

const index = Object.fromEntries(JSON.parse(
  document.getElementById("kw-index").textContent));
console.info(index);

for (const el of document.querySelectorAll(".kw-ref, .kw-def")) {
  if (el.dataset.label && el.dataset.label in index) {
    el.href = index[el.dataset.label];
  } else {
    el.removeAttribute("href");
    el.classList.add("kw-missing");
  }
}
