
const data = [
  {name:"katara red dress outfit",price:999.999,descripttion:"Anime Avatar: The Last Airbender Aang Red Dress Outfit Cosplay Costume",url:"/src/screens/client/shop/img shop/kitara cos.webp"},
  {name:"Aang red dress outfit",price:999.999,descripttion:"Anime Avatar: The Last Airbender Aang Red Dress Outfit Cosplay Costume",url:"/src/screens/client/shop/img shop/aang.png"},
  {name:"Blue Spirit Mask",price:999.999,descripttion:"Blue Spirit Mask | Avatar cosplay | Prince Zuko's Mask | Mask replica | Mask costume | Hand painted | Skull kid mask",url:"/src/screens/client/shop/img shop/blue spirit mask.png"},
  {name:"TOPH OUTFIT",price:999.999,descripttion:"Toph| Avatar cosplay | TOPH COSPLAY |",url:"/src/screens/client/shop/img shop/toph cosplay.png"},
  {name:"SOKKA OUTFIT",price:999.999,descripttion:"SOKKA| Avatar cosplay | TOPH COSPLAY || ITEM |",url:"/src/screens/client/shop/img shop/sokka.png"},
  {name:"sokka boomerang",price:999.999,descripttion:"SOKKA| Avatar cosplay | TOPH COSPLAY || ITEM |",url:"/src/screens/client/shop/img shop/sokka bommerang.png"},
  {name:"sokka boomerang",price:999.999,descripttion:"ZUKO| Avatar cosplay | ZUKO COSPLAY || COSTUME |",url:"/src/screens/client/shop/img shop/black kid zuko.png"},
  {name:"sokka boomerang",price:999.999,descripttion:"ZUKO| Avatar cosplay | ZUKO COSPLAY || COSTUME |",url:"/src/screens/client/shop/img shop/Mai retro.png"}
];
function incrementProductCount(productId, productCountSpan, totalCartCountSpan) {
  const currentCount = parseInt(productCountSpan.textContent);
  productCountSpan.textContent = currentCount + 1;

  const totalCartCount = parseInt(totalCartCountSpan.textContent);
  totalCartCountSpan.textContent = totalCartCount + 1;
}
let i=1;
let topsaleProduct = document.querySelector(".topsale-pro-list");
data.forEach((item)=>{
  const modalProduct = `<li class="topsale-pro">
  <a href="">
    <div class="topsale-pro-cover">
      <img src="${item.url}" alt="" class="img">
      <br>
      <div class="product-onfo">
        <a href="" class="topsale-name">|${item.name}|</a>
        <p class="price" style="">999.999</p>
        <button class="popup-trigger" data-popup-id="myPopup${i}" >More Info</button>
      </div>
    </div>
  </a>
  </li>
  <div id="myPopup${i}" class="popup hidden">
  <div class="popup-content">
    <div class="popup-image">
      <img src="${item.url}" alt="katara red dress outfit" srcset="">
    </div>
    <div class="text-content">
      <button id="closePopup" class="close-popup">X</button>
      <h3 class="h3">Aang red dress outfit</h3>
      <p>Anime Avatar: The Last Airbender Aang Red Dress Outfit Cosplay Costume</p>
      <button class="addcart pro1-${i} add-to-cart-button" data-product-id="${i}" onclick="incrementProductCount(${i}, document.querySelector('.span-pro1-${i}'), document.getElementById('totalcart-count'))">add to cart <span class="cart-count span-pro1-${i}" id="cart-count-pro${i}">0</span></button>
    </div>
  </div>
  </div>`;
  topsaleProduct.innerHTML+=modalProduct;
  i++;
});
const popupTriggers = document.querySelectorAll('.popup-trigger');
const closePopups = document.querySelectorAll('.close-popup');

popupTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    const popupId = trigger.getAttribute('data-popup-id');
    const popup = document.getElementById(popupId);
    popup.classList.add('show');
  });
});

closePopups.forEach(closePopup => {
  closePopup.addEventListener('click', () => {
    const popup = closePopup.closest('.popup');
    popup.classList.remove('show');
  });
});

const cartTab = document.getElementById('cart-tab');
const cartLink = document.querySelector('.header-right .shopping-cart-link');
const cartClose = document.getElementById('cart-close');

cartLink.addEventListener('click', function(e) {
  e.preventDefault();
  cartTab.classList.remove('hidden');
  cartTab.classList.add('show');

  // Set the right property to 0 with a transition
  cartTab.style.right = '0';
  cartTab.style.transition = 'right 0.3s ease-out';
});

cartClose.addEventListener('click', function() {
  cartTab.classList.remove('show');
  cartTab.classList.add('hidden');

  // Reset the right property to its initial value
  cartTab.style.right = '';
  cartTab.style.transition = '';
});

