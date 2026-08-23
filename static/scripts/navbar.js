// Collapses the navbar, leaving only the page content and the toggle button.
// The initial state is also applied by an inline script in base.html, to avoid
// the navbar flashing before this module runs.

const root = document.documentElement;
const toggle = document.getElementById("nav-toggle");

function setCollapsed(collapsed) {
  root.classList.toggle("nav-collapsed", collapsed);
  toggle.setAttribute("aria-expanded", String(!collapsed));
  toggle.setAttribute(
    "aria-label", collapsed ? "Show navigation" : "Hide navigation");
  localStorage.setItem("navCollapsed", String(collapsed));
}

setCollapsed(localStorage.getItem("navCollapsed") !== "false");

toggle.addEventListener("click", function() {
  setCollapsed(!root.classList.contains("nav-collapsed"));
});
