// theme.js
// Light/dark mode switcher with persistent preference via localStorage.

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    toggleBtn.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

    // Save the selected theme so it persists across pages and reloads
    localStorage.setItem("theme", theme);
  }

  function loadSavedTheme() {
    const saved = localStorage.getItem("theme");

    if (saved) {
      applyTheme(saved);
    } else {
      // No saved preference yet — default to light
      applyTheme("light");
    }
  }

  toggleBtn.addEventListener("click", function () {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  loadSavedTheme(); // Run on every page load
});
