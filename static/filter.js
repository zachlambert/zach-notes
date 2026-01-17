function apply_filters() {
  enable_wip = document.getElementById("filter-wip").checked;
  enable_stub = document.getElementById("filter-stub").checked;

  for (const el of document.getElementsByClassName("nav-page-complete")) {
    el.style.display = "block";
  }
  for (const el of document.getElementsByClassName("nav-page-wip")) {
    el.style.display = enable_wip ? "block" : "none";
  }
  for (const el of document.getElementsByClassName("nav-page-stub")) {
    console.log(el);
    el.style.display = enable_stub ? "block" : "none";
  }

  document.cookie = `stub=${enable_stub}`
  document.cookie = `wip=${enable_wip}`;
  console.log("Setting on change", document.cookie);
}

if (!document.cookie) {
  document.cookie = `wip=true`;
  document.cookie = `stub=false`;
}

filter_wip = document.getElementById("filter-wip");
filter_stub = document.getElementById("filter-stub");
filter_wip.checked = false;
filter_stub.checked = false;

for (const item of document.cookie.split("; ")) {
  const [key, value] = item.split("=");
  if (key == "wip" && value == "true") {
    filter_wip.checked = true;
  }
  if (key == "stub" && value == "true") {
    filter_stub.checked = true;
  }
}

apply_filters();
document.getElementById("filter-wip").addEventListener("change", apply_filters);
document
  .getElementById("filter-stub")
  .addEventListener("change", apply_filters);

document.getElementById("section");
