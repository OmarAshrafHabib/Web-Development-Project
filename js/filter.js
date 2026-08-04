document.addEventListener("DOMContentLoaded", function () {
  const filterInput = document.getElementById("filter-input");
  const noResults = document.getElementById("no-results");

  if (!filterInput) return; // page doesn't have a filter bar

  function runFilter() {
    const query = filterInput.value.toLowerCase().trim();

    // Adjust the selector to match whichever page we're on:
    // .project-card on projects.html, .post-card on blog.html
    const cards = document.querySelectorAll(".project-card, .post-card");
    let visibleCount = 0;

    cards.forEach(function (card) {
      const title = card.querySelector(".card-title, h3")
        ? card.querySelector(".card-title, h3").textContent.toLowerCase()
        : "";
      const secondaryText = card.querySelector(".card-tag, .category-tag")
        ? card.querySelector(".card-tag, .category-tag").textContent.toLowerCase()
        : "";

      const matches = title.includes(query) || secondaryText.includes(query);

      card.style.display = matches ? "" : "none";
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  filterInput.addEventListener("input", runFilter);

  // On the Blog page, posts are added dynamically by blog.js after a
  // fetch() call — they may not exist yet when this script first runs.
  // Re-run the filter once posts have been rendered so it works correctly.
  document.addEventListener("posts-rendered", runFilter);
});