//Phần login
import { dbFireStore, Auth } from "../../../config-firebase.js";
import { collection, getDocs, getDoc, doc,} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
const name_user = document.querySelector(".name_user");
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../Auth/Login/login.html";
}
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "../Auth/Login/login.html";
};
onAuthStateChanged(Auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(dbFireStore, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      name_user.innerText = data.name;
    } else {
      console.log("No such document!");
    }
  } else {
  }
});
//Phần giao diện

//Animation Sidebar 
// function RunSideBar() {
//   const SideBar = document.getElementById("sidebar");
//   if (SideBar.style.display="flex") {
//     SideBar.style.animation="LeftToRight 1s";
//   } else {
//     SideBar.style.animation="RightToLeft 1s";
//   }
// }
// document.getElementById("MenuBtn").addEventListener("click",RunSideBar());
document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('MenuBtn');
  const sidebar = document.getElementById('sidebar');

  menuBtn.addEventListener('click', function () {
      if (sidebar.style.display === 'none') {
          sidebar.style.display = 'flex';
          setTimeout(()=>{
            sidebar.style.transform = 'translateX(0)';
        },200)
      } else {
          sidebar.style.transform = 'translateX(-20vw)';
          setTimeout(() => {
              sidebar.style.display = 'none';
          }, 200);
      }
  });
});