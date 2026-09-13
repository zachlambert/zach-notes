// Rewrites [[term]] and [[term|display]] in the page text into links to
// wherever that term is defined. Zola passes the brackets through untouched, so
// the rewrite has to happen here rather than at build time.
//
// Loaded after katex.js in base.html, see the comment there.

const index = Object.fromEntries(JSON.parse(
  document.getElementById("keyword-index").textContent));
console.info(index);

for (const el of document.querySelectorAll(".keyword, .definition")) {
  if (el.dataset.keyword && el.dataset.keyword in index) {
    el.href = index[el.dataset.keyword];
  } else {
    el.removeAttribute("href");
    el.classList.add("keyword-missing");
  }
}
