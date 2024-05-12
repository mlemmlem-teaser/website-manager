document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  contactForm.style.opacity = "0"; // Set initial opacity to 0
  contactForm.style.transition = "opacity 1s"; // Add transition effect
  setTimeout(function () {
    contactForm.style.opacity = "1"; // Change opacity to 1
  }, 100);
});
