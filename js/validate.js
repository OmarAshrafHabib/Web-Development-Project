document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "-error");
    errorEl.textContent = message;
    errorEl.classList.add("visible");
  }

  function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + "-error");
    errorEl.classList.remove("visible");
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate name — not empty
    if (name === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    } else {
      clearError("name");
    }

    if (email === "") {
      showError("email", "Please enter your email address.");
      isValid = false;
    } else if (!validateEmail(email)) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError("email");
    }

    if (message.length < 20) {
      showError("message", "Message must be at least 20 characters.");
      isValid = false;
    } else {
      clearError("message");
    }

    if (isValid) {
      form.style.display = "none";
      document.getElementById("form-success").classList.add("visible");
    }
  });

  ["name", "email", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      clearError(id);
    });
  });
});