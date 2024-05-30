const ratingForm = document.querySelector('.rating-system');
const ratingCount = document.getElementById('rating-count');

let totalRatings = 0;
let ratingsMap = new Map();

ratingForm.addEventListener('mouseover', (event) => {
  if (event.target.classList.contains('face-icon')) {
    const text = event.target.dataset.text;
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = text;
    event.target.appendChild(tooltip);
  }
});

ratingForm.addEventListener('mouseout', (event) => {
  if (event.target.classList.contains('face-icon')) {
    event.target.removeChild(event.target.lastChild);
  }
});

ratingForm.addEventListener('click', (event) => {
  if (event.target.classList.contains('face-icon')) {
    const increment = parseInt(event.target.dataset.increment);
    if (!ratingsMap.has(increment)) {
      ratingsMap.set(increment, true);
      totalRatings += increment;
      ratingCount.textContent = totalRatings;
    }
  }
});