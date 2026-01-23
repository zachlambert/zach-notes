
// Restores scroll position on reload, even with dynamic changes
// shortly after reload

window.addEventListener("DOMContentLoaded", () => {
  const scrollX = parseInt(localStorage.getItem("scrollX") ?? 0);
  const scrollY = parseInt(localStorage.getItem("scrollY") ?? 0);
  function restoreScroll() {
    window.scrollTo(scrollX, scrollY);
    localStorage.setItem("scrollX", window.scrollX);
    localStorage.setItem("scrollY", window.scrollY);
  }
  restoreScroll();
  // Also run after some timeout to allow dynamic changes
  setTimeout(() => {
    restoreScroll();
    window.addEventListener("scroll", () => {
      localStorage.setItem("scrollX", window.scrollX);
      localStorage.setItem("scrollY", window.scrollY);
    });
  }, 400);
});
