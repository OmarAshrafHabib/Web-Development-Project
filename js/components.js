function loadComponent(selector, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) throw new Error("Could not load " + filePath);
      return response.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;

      // After injecting the header, re-run the theme toggle setup
      // (the button now exists in the DOM). initThemeToggle() lives in
      // theme.js and simply does nothing if the button isn't found —
      // which is what happens harmlessly when this runs for the footer.
      initThemeToggle();
    })
    .catch(error => console.error(error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("#header-placeholder", "components/header.html");
  loadComponent("#footer-placeholder", "components/footer.html");
});