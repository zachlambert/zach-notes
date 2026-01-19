// Render PDFs

const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const queueOperations = []
let renderInProgress = false;

function renderPdf(url, page, pageCountAttr, pageCountEl, canvas) {
  renderInProgress = true;
  pdfjsLib
    .getDocument(url)
    .promise.then(function (doc) {
      pageCountAttr.nodeValue = doc.numPages;
      pageCountEl.innerHTML = doc.numPages;
      return doc.getPage(page);
    })
    .then(function (page) {
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      return page.render({
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      }).promise;
    }).then(function () {
      if (queueOperations.length > 0) {
        const operation = queueOperations.pop();
        operation();
      } else {
        renderInProgress = false;
      }
    });
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

  function callOperation(operation) {
    if (renderInProgress) {
      queueOperations.push(operation);
    } else {
      operation();
    }
  }
  function onPrev() {
    if (parseInt(pageAttr.nodeValue) > 1) {
      callOperation(() => {
        pageAttr.nodeValue = parseInt(pageAttr.nodeValue) - 1;
        pageEl.innerHTML = pageAttr.nodeValue;
        renderThis();
      });
    }
  }
  function onNext() {
    if (parseInt(pageAttr.nodeValue) < parseInt(pageCountAttr.nodeValue)) {
      callOperation(() => {
        pageAttr.nodeValue = parseInt(pageAttr.nodeValue) + 1;
        pageEl.innerHTML = pageAttr.nodeValue;
        renderThis();
      });
    }
  }

  el.getElementsByClassName("pdf-viewer-prev")[0].addEventListener("click", onPrev);
  el.getElementsByClassName("pdf-viewer-next")[0].addEventListener("click", onNext);
  canvas.addEventListener(
    "click",
    function(event) {
      if (event.offsetX < canvas.width / 2) {
        onPrev();
      } else {
        onNext();
      }
    }
  );
}
