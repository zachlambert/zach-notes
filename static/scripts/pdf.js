// Render PDFs

const pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const queueOperations = []
let renderInProgress = false;

function renderPdf(url, pdfState, canvas, textLayer) {
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

      // Transparent text positioned over the canvas, so the text can be selected
      textLayer.innerHTML = "";
      textLayer.style.width = `${viewport.width}px`;
      textLayer.style.height = `${viewport.height}px`;
      const renderText = page.getTextContent().then(function (textContent) {
        return pdfjsLib.renderTextLayer({
          textContent: textContent,
          container: textLayer,
          viewport: viewport,
          textDivs: [],
        }).promise;
      });

      return Promise.all([
        page.render({
          canvasContext: canvas.getContext("2d"),
          viewport: viewport,
        }).promise,
        renderText,
      ]);
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

  // Wrap the canvas so the text layer can be placed on top of it
  const pageContainer = document.createElement("div");
  pageContainer.className = "pdf-viewer-page-container";
  canvas.replaceWith(pageContainer);
  pageContainer.appendChild(canvas);
  const textLayer = document.createElement("div");
  textLayer.className = "pdf-viewer-text-layer";
  pageContainer.appendChild(textLayer);
  const pageEl = el.getElementsByClassName("pdf-viewer-page")[0]
  pageEl.innerHTML = pdfState.page;
  const pageCountEl = el.getElementsByClassName("pdf-viewer-page-count")[0]
  pageCountEl.innerHTML = pdfState.pageCount;

  function renderThis() {
    renderPdf(url, pdfState, canvas, textLayer);
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
  pageContainer.addEventListener(
    "click",
    function(event) {
      // Don't change page when clicking on text or finishing a text selection
      if (event.target.tagName == "SPAN" || !window.getSelection().isCollapsed) {
        return;
      }
      const rect = pageContainer.getBoundingClientRect();
      if (event.clientX - rect.left < rect.width / 2) {
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
