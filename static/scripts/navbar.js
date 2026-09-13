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

// Close the dropdown when following a link, so the next page doesn't open
// with it covering the content. Links to sections that aren't already open are
// the exception, so the section's pages can be picked from the menu next.
document.getElementById("navbar").addEventListener("click", function(event) {
  const link = event.target.closest("a");
  if (!link) {
    return;
  }
  const section = link.closest(".nav-section");
  if (section && !section.classList.contains("open")) {
    return;
  }
  setCollapsed(true);
});
