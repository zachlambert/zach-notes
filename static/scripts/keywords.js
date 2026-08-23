// Rewrites [[term]] and [[term|display]] in the page text into links to
// wherever that term is defined. Zola passes the brackets through untouched, so
// the rewrite has to happen here rather than at build time.
//
// Loaded after katex.js in base.html, see the comment there.

const index = Object.fromEntries(JSON.parse(
  document.getElementById("keyword-index").textContent));

for (const el of document.getElementsByClassName("keyword")) {
  el.href = index[el.dataset.keyword];
}
// const index = new Map();
// for (const entry of entries) {
//   const fields = entry.split("|");
//   index.set(fields[0], fields[2]);
// }
