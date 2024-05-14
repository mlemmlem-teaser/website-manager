
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
