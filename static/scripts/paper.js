// https://www.crossref.org/documentation/retrieve-metadata/rest-api/

// Example result, open in browser to see returned json object:
// https://api.crossref.org/works/doi/10.1109/ISMAR.2007.4538852

// Only the fields used by setPaperData are cached, since the full result
// includes the reference list and can be large.
const cachedFields = ["title", "published", "references-count", "author"];

function cacheKey(label) {
  return `paper-${label}`;
}

function loadCached(label) {
  try {
    return JSON.parse(localStorage.getItem(cacheKey(label)));
  } catch {
    return null;
  }
}

function saveCached(label, data) {
  const trimmed = {};
  for (const field of cachedFields) {
    if (field in data) {
      trimmed[field] = data[field];
    }
  }
  try {
    localStorage.setItem(cacheKey(label), JSON.stringify(trimmed));
  } catch {
    // Storage full or unavailable, the data is just fetched again next time
  }
}

// Writes the crossref data for a paper into its paper-summary element
function setPaperData(el, data) {
  function setData(key, value) {
    const data_els = el.getElementsByClassName(`paper-data-${key}`);
    data_els[0].innerHTML = value;
  }

  if ("title" in data) {
    setData("title", data["title"][0]);
  }
  if ("published" in data) {
    setData("year", data["published"]["date-parts"][0][0]);
  }
  if ("references-count" in data) {
    setData("references", data["references-count"]);
  }

  if ("author" in data) {
    let authors = "";
    for (const [i, author] of data["author"].entries()) {
      authors += `${author["given"]} ${author["family"]}`;
      if (i != data["author"].length - 1) {
        authors += ", ";
      }
    }
    setData("authors", authors);
  }
}

const requestsQueue = [];
for (const el of document.getElementsByClassName("paper-data")) {
  const doi = el.attributes["data-doi"].nodeValue;
  const label = el.attributes["data-label"].nodeValue;

  const cached = loadCached(label);
  if (cached) {
    setPaperData(el, cached);
    continue;
  }

  const url = `https://api.crossref.org/works/doi/${doi}`;
  requestsQueue.push({ el: el, label: label, url: url });
}
requestsQueue.reverse();

// Must wait for one request to be complete for sending the next
function sendRequest() {
  if (requestsQueue.length == 0) {
    return;
  }
  const { el, label, url } = requestsQueue.pop();

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .catch(() => null)
    .then((response) => {
      if (!response) {
        el.innerHTML = "Failed to fetch data";
        sendRequest();
        return;
      }

      saveCached(label, response.message);
      setPaperData(el, response.message);
      sendRequest();
    });
}

sendRequest();
