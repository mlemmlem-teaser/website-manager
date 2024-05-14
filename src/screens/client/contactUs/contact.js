document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector(".contact-form");
  contactForm.style.opacity = ""; // Set initial opacity to 0
  contactForm.style.transition = "opacity 1s"; // Add transition effect
  setTimeout(function () {
    contactForm.style.opacity = "1"; // Change opacity to 1
  }, 100);
});
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("MenuBtn");
  const sidebar = document.getElementById("sidebar");

  menuBtn.addEventListener("click", function () {
    if (sidebar.style.display === "none") {
      sidebar.style.display = "flex";
      setTimeout(() => {
        sidebar.style.transform = "translateX(0)";
      }, 200);
    } else {
      sidebar.style.transform = "translateX(-30vw)";
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 200);
    }
  });
});
