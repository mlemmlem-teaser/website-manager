document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");

  let delay = 0;
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, delay);
    delay += 90; // Delay in milliseconds between each item appearing
  });
});
