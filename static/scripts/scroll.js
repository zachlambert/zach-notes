
// Restores scroll position on reload, even with dynamic changes
// shortly after reload

window.addEventListener("DOMContentLoaded", () => {
  const scrollX = parseInt(localStorage.getItem("scrollX") ?? 0);
  const scrollY = parseInt(localStorage.getItem("scrollY") ?? 0);
  function saveScroll() {
    localStorage.setItem("scrollX", window.scrollX);
    localStorage.setItem("scrollY", window.scrollY);
  }
  // An anchor in the url wins over the saved position, otherwise following a
  // keyword link would land at wherever the page was last left. Re-applied
  // rather than left to the browser, since katex reflows the page after the
  // initial jump. The hash is read each time so that an anchor clicked before
  // the timeout fires is followed rather than undone.
  function restoreScroll() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) {
      target.scrollIntoView();
    } else if (!id) {
      window.scrollTo(scrollX, scrollY);
    }
    saveScroll();
  }
  restoreScroll();
  // Also run after some timeout to allow dynamic changes
  setTimeout(() => {
    restoreScroll();
    window.addEventListener("scroll", saveScroll);
  }, 400);
});
