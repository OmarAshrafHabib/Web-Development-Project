document.addEventListener("DOMContentLoaded", function () {
  const blogList = document.getElementById("blog-list");

  fetch("data/posts.json")
    .then(response => response.json())
    .then(posts => {
      // Sort newest to oldest by date
      posts.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Clear the placeholder message
      blogList.innerHTML = "";

      posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-card");

        // Reader-friendly date, e.g. "July 20, 2026"
        const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });

        const isLatest = index === 0;

        postElement.innerHTML = `
          ${isLatest ? '<span class="latest-badge">Latest Post</span>' : ""}
          <p class="post-meta">
            <span class="category-tag">${post.category}</span> · ${formattedDate}
          </p>
          <h3>${post.title}</h3>
          <p>${post.summary}</p>
          <a href="#" class="read-more" data-id="${post.id}">Read more →</a>
          <p class="post-full" style="display: none;">${post.content}</p>
        `;

        blogList.appendChild(postElement);
      });

      // Wire up "Read more" toggles after posts are rendered
      document.querySelectorAll(".read-more").forEach(link => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const fullText = this.nextElementSibling;
          const isOpen = fullText.style.display === "block";
          fullText.style.display = isOpen ? "none" : "block";
          this.textContent = isOpen ? "Read more →" : "Show less ↑";
        });
      });
    })
    .catch(error => console.error("Error loading posts:", error));
});