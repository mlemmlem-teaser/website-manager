let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart"><span><b>Add to cart</b></span></button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};
listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}" style="width: 74px;height: 100px">
                    <a class="delete">Delete</a>
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus" style="background: none;color:#fff">◀</span>
                    <span>${item.quantity}</span>
                    <span class="plus" style="background: none;color:#fff">▶</span>
                </div>
            `;
      totalPrice = info.price * item.quantity;
    });
  }
  iconCartSpan.innerText = totalQuantity;
  let totalPriceAll = 0;
  listCartHTML.querySelectorAll(".totalPrice").forEach((element) => {
    totalPriceAll = totalPriceAll + parseInt(element.innerText.slice(1));
  });
  document.querySelector(".total-price").innerText = `${totalPriceAll}`;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  // get data product
  fetch("shop.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();

document.querySelector(".checkOut").addEventListener("click", () => {
  let cartElement = document.querySelector(".cartTab");
  cartElement.style.opacity = 0;
  setTimeout(() => {
    cart = [];
    localStorage.removeItem("cart");
    addCartToHTML();
    cartElement.style.opacity = 1;
  }, 500);
});

document.querySelector(".listCart").addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("delete")) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let positionItemInCart = cart.findIndex(
      (value) => value.product_id == product_id
    );
    let item = positionClick.parentElement.parentElement;
    item.style.opacity = 1;
    setTimeout(() => {
      cart.splice(positionItemInCart, 1);
      addCartToHTML();
      addCartToMemory();
      item.style.opacity = 1;
    }, 300);
  }
});

document.querySelector(".listCart").style.overflowY = "scroll";

window.addEventListener("DOMContentLoaded", (event) => {
  let elementToSlideDown = document.querySelector(".advert");
  elementToSlideDown.classList.add("slide-down-animation");
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