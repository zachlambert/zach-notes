// Render LaTeX via katex

const macros = [];
macros["\\R"] = "\\mathbb{R}";
macros["\\Mat"] = "\\left[\\begin{matrix}#1\\end{matrix}\\right]";
macros["\\WrapS"] = "\\left[#1\\right]";
macros["\\WrapP"] = "\\left(#1\\right)";
macros["\\WrapC"] = "\\left\\{#1\\right\\}";
macros["\\Exp"] = "\\mathrm{Exp}";
macros["\\Log"] = "\\mathrm{Log}";
macros["\\argmax"] = "\\operatornamewithlimits{arg\\,max}";
macros["\\argmin"] = "\\operatornamewithlimits{arg\\,min}";
macros["\\SO"] = "\\mathrm{SO}";
macros["\\SE"] = "\\mathrm{SE}";
macros["\\eps"] = "\\epsilon";

document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    macros: macros,
    throwOnError: false,
  });
});

