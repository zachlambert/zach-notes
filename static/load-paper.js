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
    let html = "";
    function makeField(key, value) {
      html += `<div><div>${key}</div><div>${value}</div></div>`
    }
    makeField("Year", data["published"]["date-parts"][0][0]);

    el.innerHTML = html;
  });
}
