for (const el of document.getElementsByClassName("paper-summary")) {
  const doi = el.attributes["data-doi"].nodeValue;

  // https://www.crossref.org/documentation/retrieve-metadata/rest-api/

  // Example result, open in browser to see returned json object:
  // https://api.crossref.org/works/doi/10.1109/ISMAR.2007.4538852

  const url=`https://api.crossref.org/works/doi/${doi}`

  fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }).then((response) => {
    const data = response.message;
    console.log(data);
    let html = "";
    function makeField(key, value) {
      html += `<div>${key}</div><div>${value}</div>`
    }

    if ("title" in data) {
      makeField("Title", data["title"][0]);
    }
    if ("published" in data) {
      makeField("Year", data["published"]["date-parts"][0][0]);
    }
    if ("references-count" in data) {
      makeField("References", data["references-count"]);
    }

    if ("author" in data) {
      let authors="";
      for (const [i, author] of data["author"].entries()) {
        authors += `${author["given"]} ${author["family"]}`;
        if (i != data["author"].length-1) {
          authors += ", ";
        }
      }
      makeField("Authors", authors);
    }

    if ("URL" in data) {
      const url = data["URL"];
      makeField("URL", `<a href='${url}'>${url}</a>`);
    }

    if ("abstract" in data) {
      const abstract = data["abstract"];
      makeField("Abstract", `<p>${abstract}</p>`);
    }

    el.innerHTML = html;
  });
}
