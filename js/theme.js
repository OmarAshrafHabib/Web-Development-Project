
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  }

  // Save the selected theme so it persists across pages and reloads
  localStorage.setItem("theme", theme);
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");

  if (!toggleBtn) return;

  if (toggleBtn.dataset.initialized === "true") return;
  toggleBtn.dataset.initialized = "true";

  const current = document.body.getAttribute("data-theme") || "light";
  toggleBtn.textContent = current === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";

  toggleBtn.addEventListener("click", function () {
    const now = document.body.getAttribute("data-theme");
    const next = now === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
});
