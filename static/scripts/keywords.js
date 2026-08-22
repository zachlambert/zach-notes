// Rewrites [[term]] and [[term|display]] in the page text into links to
// wherever that term is defined. Zola passes the brackets through untouched, so
// the rewrite has to happen here rather than at build time.
//
// Loaded after katex.js in base.html, see the comment there.

const entries = JSON.parse(
  document.getElementById("keyword-index").textContent);

const index = new Map();
for (const entry of entries) {
  const fields = entry.split("|");
  index.set(fields[0], fields[2]);
}

const pattern = /\[\[([^\[\]|]+?)(?:\|([^\[\]|]+?))?\]\]/g;

function normalise(term) {
  return term.trim().toLowerCase().replace(/\s+/g, " ");
}

function lookup(term) {
  const key = normalise(term);
  if (index.has(key)) {
    return index.get(key);
  }
  // So a plain plural resolves without needing [[term|display]]
  if (key.endsWith("s")) {
    return index.get(key.slice(0, -1));
  }
  return undefined;
}

function skip(node) {
  for (let el = node.parentElement; el; el = el.parentElement) {
    const tag = el.tagName;
    if (tag === "CODE" || tag === "PRE" || tag === "A" || tag === "SCRIPT") {
      return true;
    }
    // .katex contains a MathML copy of the latex source, which would otherwise
    // get rewritten a second time and rendered visibly
    if (el.classList.contains("katex")) {
      return true;
    }
  }
  return false;
}

function rewrite(node) {
  const text = node.nodeValue;
  const fragment = document.createDocumentFragment();
  let last = 0;
  let match;

  pattern.lastIndex = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      fragment.appendChild(
        document.createTextNode(text.slice(last, match.index)));
    }

    const term = match[1].trim();
    const display = match[2] === undefined ? term : match[2].trim();
    const url = lookup(term);

    let el;
    if (url) {
      el = document.createElement("a");
      el.className = "keyword";
      el.href = url;
    } else {
      el = document.createElement("span");
      el.className = "keyword keyword-missing";
      el.title = `No definition for "${term}"`;
    }
    el.textContent = display;
    fragment.appendChild(el);

    last = pattern.lastIndex;
  }

  fragment.appendChild(document.createTextNode(text.slice(last)));
  node.parentNode.replaceChild(fragment, node);
}

document.addEventListener("DOMContentLoaded", function() {
  // section.html has no #content wrapper, so fall back to main. Either way this
  // excludes the navbar.
  const root = document.getElementById("content")
    || document.getElementsByTagName("main")[0];
  if (!root) {
    return;
  }

  // Collect before replacing. Mutating the tree while the walker is live makes
  // it skip the following siblings.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const targets = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.nodeValue.includes("[[") && !skip(node)) {
      targets.push(node);
    }
  }
  for (const node of targets) {
    rewrite(node);
  }
});
