import { getDatabase, set, ref, get,} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { dbRealTime } from "../../../config-firebase.js";

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("MenuBtn");
  const sidebar = document.getElementById("sidebar");
  const UserManagerContainer = document.getElementById("UserManagerContainer");

  menuBtn.addEventListener("click", async function () {
    if (sidebar.style.display === "none") {
      sidebar.style.display = "flex";
      setTimeout(() => {
        sidebar.style.transform = "translateX(0)";
      }, 200);
    } else {
      sidebar.style.transform = "translateX(-20vw)";
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 200);
    }
  });
});
//uuid
function generateUUID() {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(16).slice(2, 8);
  const uuid = `${timestamp}-${randomPart}`;
  return uuid;
}
//addProduct
const addProduct = document.getElementById("small-button");
const productForm = document.getElementById("productForm");
console.log(addProduct, productForm);
function openForm() {
  productForm.style.display = "inherit";
}
addProduct.addEventListener("click", () => {
  openForm();
});
const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  productForm.style.display = "none";
});
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", async (e) => {
  console.log(generateUUID());
  e.preventDefault();
  const name = document.getElementById("name");
  const price = document.getElementById("price");
  const description = document.getElementById("description");
  await set(ref(dbRealTime, "products/" + generateUUID()), {
    id: generateUUID(),
    nameProduct: name.value,
    price: price.value,
    description: description.value,
  });
  productForm.style.display = "none";
});
