// Render PDFs

const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const queueOperations = []
let renderInProgress = false;

function renderPdf(url, pdfState, canvas) {
  renderInProgress = true;
  pdfjsLib
    .getDocument(url)
    .promise.then(function (doc) {
      pdfState.pageCount = doc.numPages;
      return doc.getPage(pdfState.page);
    })
    .then(function (page) {
      const viewport = page.getViewport({ scale: 1.4 });
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

function getPdfState(url) {
  if (!localStorage.getItem("pdfStates")) {
    localStorage.setItem("pdfStates", "{}");
  }
  const pdfStates = new Map(Object.entries(JSON.parse(localStorage.getItem("pdfStates"))));
  if (!pdfStates.has(url)) {
    return {
      page: 1,
      pageCount: 1,
      open: false
    };
  }
  return pdfStates.get(url);
}
function updatePdfState(url, pdfState) {
  const pdfStates = new Map(Object.entries(JSON.parse(localStorage.getItem("pdfStates"))));
  pdfStates.set(url, pdfState);
  localStorage.setItem("pdfStates", JSON.stringify(Object.fromEntries(pdfStates)));
}

for (const el of document.getElementsByClassName("pdf-viewer")) {
  const url = el.attributes["data-url"].nodeValue;
  const pdfState = getPdfState(url);
  el.open = pdfState.open;
  const canvas = el.getElementsByTagName("canvas")[0];
  const pageEl = el.getElementsByClassName("pdf-viewer-page")[0]
  pageEl.innerHTML = pdfState.page;
  const pageCountEl = el.getElementsByClassName("pdf-viewer-page-count")[0]
  pageCountEl.innerHTML = pdfState.pageCount;

  function renderThis() {
    renderPdf(url, pdfState, canvas);
    pageCountEl.innerHTML = pdfState.pageCount;
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
    if (parseInt(pdfState.page) > 1) {
      callOperation(() => {
        pdfState.page = parseInt(pdfState.page) - 1;
        pageEl.innerHTML = pdfState.page;
        renderThis();
        updatePdfState(url, pdfState);
      });
    }
  }
  function onNext() {
    if (parseInt(pdfState.page) < parseInt(pdfState.pageCount)) {
      callOperation(() => {
        pdfState.page = parseInt(pdfState.page) + 1;
        pageEl.innerHTML = pdfState.page
        renderThis();
        updatePdfState(url, pdfState);
      });
    }
  }
  function onFirst() {
    if (parseInt(pdfState.page) != 1) {
      callOperation(() => {
        pdfState.page = 1;
        pageEl.innerHTML = pdfState.page
        renderThis();
        updatePdfState(url, pdfState);
      });
    }
  }
  function onLast() {
    if (parseInt(pdfState.page) != parseInt(pdfState.pageCount)) {
      callOperation(() => {
        pdfState.page = parseInt(pdfState.pageCount);
        pageEl.innerHTML = pdfState.page
        renderThis();
        updatePdfState(url, pdfState);
      });
    }
  }

  el.getElementsByClassName("pdf-viewer-prev")[0].addEventListener("click", onPrev);
  el.getElementsByClassName("pdf-viewer-next")[0].addEventListener("click", onNext);
  el.getElementsByClassName("pdf-viewer-first")[0].addEventListener("click", onFirst);
  el.getElementsByClassName("pdf-viewer-last")[0].addEventListener("click", onLast);
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

  el.addEventListener("toggle", function() {
    pdfState.open = el.open;
    updatePdfState(url, pdfState);
  });
}
