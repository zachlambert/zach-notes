const sections = document.getElementsByClassName("nav-section");
for (i = 0; i < sections.length; i++) {
  console.log(i)
  sections[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
