document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  contactForm.style.opacity = ""; // Set initial opacity to 0
  contactForm.style.transition = "opacity 1s"; // Add transition effect
  setTimeout(function () {
    contactForm.style.opacity = "1"; // Change opacity to 1
  }, 100);
});

