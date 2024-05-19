import {
  getDatabase,
  set,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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
      sidebar.style.transform = "translateX(-30vw)";
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 200);
    }
  });
});

//table
async function getAllProduct() {
  const data = await get(ref(dbRealTime, "products/"));
  const arrayProduct = Object.keys(data.val()).map((uuid) => {
    const objectProduct = { uuid };
    Object.assign(objectProduct, data.val()[uuid]);
    return objectProduct;
  });
  return arrayProduct;
}
let ProductInformation = document.getElementById("ProductInformation");
function resetTable() {
  ProductInformation.innerHTML="";
getAllProduct().then((items) => {
  items.forEach((item) => {
    const tr = document.createElement("tr");
    const imgurl = item.imageurl_?item.imageurl_:"/Assets/Images/Bảo.jpg";
    console.log(imgurl);
    const modal = `
  <tr>
  <th class="padding">${item.nameProduct}</th>
  <th class="number padding">${item.price} $</th>
  <th>${item.description}</th>
  <th class="textcenter"><label class="switch">
  <input type="checkbox" checked>
  <span class="slider round"></span>
  </label>
  </th>
  <th class="imgKeeper"><img src="${imgurl}" alt="" height="40px;" width="40px;"><button class="editBtn">edit</button></th>
  <th class="padding textcenter"><i class="fa-solid fa-pen-to-square"></i></th>
</tr>
`;  
    ProductInformation.innerHTML += modal;
  });
});
};
resetTable();
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
const imageurl = document.getElementById("imageurl");
const ProductPreview= document.getElementById("ProductPreview");
imageurl.addEventListener("change", ()=>{
  ProductPreview.src=imageurl.value;
});
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", async (e) => {
  console.log(generateUUID());
  e.preventDefault();
  const name = document.getElementById("name");
  const price = document.getElementById("price");
  const description = document.getElementById("description");
  const imageurl = document.getElementById("imageurl");
  const ProductPreview= document.getElementById("ProductPreview");
  imageurl.addEventListener("change", ()=>{
    ProductPreview.src=imageurl.value;
  })
  await set(ref(dbRealTime, "products/" + generateUUID()), {
    id: generateUUID(),
    nameProduct: name.value,
    price: price.value,
    description: description.value,
    imageurl_:imageurl.value,
  });
  productForm.style.display = "none";
  resetTable();
});

