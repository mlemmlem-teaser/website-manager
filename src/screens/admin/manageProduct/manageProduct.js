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
      sidebar.style.transform = "translateX(-20vw)";
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
<<<<<<< HEAD
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
=======
    const itemNameProduct = document.createElement("th"); itemNameProduct.classList.add("padding");itemNameProduct.innerText=item.nameProduct;
    const itemPrice = document.createElement("th"); itemPrice.classList.add("padding","number");itemPrice.innerText=item.price;
    const itemDescription = document.createElement("th");itemDescription.innerText=item.description;
    const slider = document.createElement("th");slider.classList.add("textcenter");slider.innerHTML='<label class="switch"><input type="checkbox" checked><span class="slider round"></span</label>';
    const itemImgKeeper = document.createElement("th");itemImgKeeper.classList.add("imgKeeper");
    const img= document.createElement("img"); img.src=imgurl;img.style.height="80px";img.style.width="80px";
    const button = document.createElement("button"); button.classList.add("editBtn"); button.innerText="Edit";
    const Setting = document.createElement("th"); Setting.classList.add("padding","textcenter","larger");
    const icon = document.createElement("i");icon.classList.add("fa-solid","fa-pen-to-square","Product_Setting");

    tr.appendChild(itemNameProduct);
    tr.appendChild(itemPrice);
    tr.appendChild(itemDescription);
    tr.appendChild(slider);
    itemImgKeeper.appendChild(img);
    itemImgKeeper.appendChild(button);
    tr.appendChild(itemImgKeeper);
    Setting.appendChild(icon);
    tr.appendChild(Setting);
    ProductInformation.appendChild(tr);
    icon.addEventListener("click", ()=>{
      const productForm2 =document.getElementById("productForm2");
      productForm2.style.display="inherit";
      const imageurl2= document.getElementById("imageurl2");
      const ProductPreview= document.getElementById("ProductPreview2");
      const name2= document.getElementById("name2");
      const price2= document.getElementById("price2");
      const description2= document.getElementById("description2");
      const cancelBtn2= document.getElementById("cancelBtn2");
      const saveBtn2= document.getElementById("saveBtn2");
      imageurl2.value=item.imageurl_;
      ProductPreview.src=item.imageurl_;
      name2.value=item.nameProduct;
      price2.value=item.price;
      description2.value=item.description;
      cancelBtn2.addEventListener("click", (e)=>{
        e.preventDefault();
        productForm2.style.display="none";
      })
      saveBtn2.addEventListener("click", (e)=>{
        e.preventDefault();
        get(ref(dbRealTime, `products/${item.id}`)).then((data) => {
          if (data.exists()) {
            const Prd = data.val()
            console.log(Prd);
          } else {
            console.log("No data available");
          }
        }
        )
        productForm2.style.display="none";

      })
    })
    
  
>>>>>>> 20401a28f21ca35085297f722652f2a7611fb4fd
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

