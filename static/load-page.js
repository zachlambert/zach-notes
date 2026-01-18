// Render LaTeX via katex
document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
  });
});

// Render PDFs

const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

function renderPdf(url, page, pageCountAttr, pageCountEl, canvas) {
  pdfjsLib
    .getDocument(url)
    .promise.then(function (doc) {
      pageCountAttr.nodeValue = doc.numPages;
      pageCountEl.innerHTML = doc.numPages;
      return doc.getPage(page);
    })
    .then(function (page) {
      const viewport = page.getViewport({ scale: 1.8 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      });
    })
}

for (const el of document.getElementsByClassName("pdf-viewer")) {
  const urlAttr = el.attributes["data-url"];
  const pageAttr = el.attributes["data-page"];
  const pageCountAttr = el.attributes["data-page-count"];
  const canvas = el.getElementsByTagName("canvas")[0];
  const pageEl = el.getElementsByClassName("pdf-viewer-page")[0]
  const pageCountEl = el.getElementsByClassName("pdf-viewer-page-count")[0]
  pageCountAttr.nodeValue = 1;
  pageEl.innerHTML = 1;
  pageCountAttr.nodeValue = 1;
  pageCountEl.innerHTML = 1;

  function renderThis() {
    renderPdf(urlAttr.nodeValue, parseInt(pageAttr.nodeValue), pageCountAttr, pageCountEl, canvas);
  };
  renderThis();

  el.getElementsByClassName("pdf-viewer-prev")[0].addEventListener(
    "click",
    function () {
      if (parseInt(pageAttr.nodeValue) > 1) {
        pageAttr.nodeValue = parseInt(pageAttr.nodeValue) - 1;
        pageEl.innerHTML = pageAttr.nodeValue;
        renderThis();
      }
    },
  );
  el.getElementsByClassName("pdf-viewer-next")[0].addEventListener(
    "click",
    function () {
      if (parseInt(pageAttr.nodeValue) < parseInt(pageCountAttr.nodeValue)) {
        pageAttr.nodeValue = parseInt(pageAttr.nodeValue) + 1;
        pageEl.innerHTML = pageAttr.nodeValue;
        renderThis();
      }
    },
  );
}
