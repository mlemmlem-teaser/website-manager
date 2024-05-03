import { dbFireStore, Auth } from "/src/config-firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
const user_info = document.querySelector(".user-info");
const user_avatar = document.querySelector("#user-avatar");
const token = localStorage.getItem("token");
const showMdl = document.querySelector("#showModal");

if (!token) {
  window.location.href = "/src/screens/client/Auth/Login/login.html";
}
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/src/screens/client/Auth/Login/login.html";
};
function resetState() {
  onAuthStateChanged(Auth, async (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      const docRef = doc(dbFireStore, "users", uid);
      const docRef2 = doc(dbFireStore, "admin", uid);
      const docSnap = await getDoc(docRef);
      const docSnap2 = await getDoc(docRef2);
      async function showModal(user) {
        const modal = `<form id="userForm">
<div>
  <img id="avatarPreview" src="${user.avatar}" alt="Ảnh đại diện"> <br/> Avatar
  <input type="text" id="newAvatarUrl" value="${user.avatar}" style="width:100%;"/>
</div>
<div>
  <label for="username">Username:</label>
  <input type="text" id="username" value="${
    user.name || user.username
  }"required>
</div>
<div>
  <label for="email">Email:</label>
  <input type="email" id="email" value="${user.email}" required>
</div>
<div>
  <label for="birth">Ngày sinh:</label>
  <input type="date" id="birth" value="${user.date}" required>
</div>
<div>
  <select name="gender" id="gender" required>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
  </select>
</div>
<div>
  <label for="created">Ngày tạo:</label>
  <input type="text" id="created" value="${user.accountCreated}" disabled>
</div>
<div>
  <button type="button" id="cancelBtn">Cancel</button>
  <button type="submit" id="saveBtn">Save</button>
</div>
</form>`;
        showMdl.innerHTML = modal;
        const form = document.getElementById("userForm");
        form.style.display = "inherit";
        const cancelBtn = document.getElementById("cancelBtn");
        const saveBtn = document.getElementById("saveBtn");
        cancelBtn.addEventListener("click", () => {
          const userForm = document.getElementById("userForm");
          userForm.style.display = "none";
        });
        function Usernamecheck(abcde) {
          if (
            abcde.length <= 6 ||
            ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
              abcde.charAt(0)
            ) ||
            abcde.length >= 31
          ) {
            alert(
              "Username phải trên 6 kí tự, dưới 32 kí tự và bắt đầu bằng 1 kí tự chữ"
            );
            return false;
          } else {
            return true;
          }
        }
        saveBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const role = user.status.role == "admin" ? "admin" : "users";
          const userDocRef = doc(dbFireStore, role, user.id);
          const userForm = document.getElementById("userForm");
          const avatarPreviewChange = document.getElementById("avatarPreview");
          const newAvatarUrl = document.getElementById("newAvatarUrl");
          const usernameChange = document.getElementById("username");
          const emailChange = document.getElementById("email");
          const birthChange = document.getElementById("birth");
          const genderChange = document.getElementById("gender");
          if (user.status.active == "true" || user.status.active == true) {
            if (Usernamecheck(usernameChange.value)) {
              try {
                await updateDoc(
                  userDocRef,
                  {
                    avatar: newAvatarUrl.value,
                    username: usernameChange.value,
                    email: emailChange.value,
                    date: birthChange.value,
                    gender: genderChange.value,
                  },
                  { merge: true }
                );
                resetState();
              } catch (error) {
                console.error(error);
              }
            } else {
              alert(
                "Username phải trên 6 kí tự, dưới 32 kí tự và bắt đầu bằng 1 kí tự chữ"
              );
            }
          } else {
            alert("have to active this user");
          }
          userForm.style.display = "none";
        });
      }
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        user_info.innerText = data.username;
        user_avatar.src = data.avatar != undefined
          ? data.avatar
          : "/Assets/Images/default-user-img.webp";
        console.log(data.avatar);
        user_avatar.addEventListener("click", async () => {
          await showModal(data);
        });
      } else if (docSnap2.exists()) {
        const data = docSnap2.data();
        console.log(data);
        user_info.innerText = data.username;
        user_avatar.src = data.avatar != undefined
          ? data.avatar
          : "/Assets/Images/default-user-img.webp";
        console.log(data.avatar);
        user_avatar.addEventListener("click", async () => {
          await showModal(data);
        });
      } else {
        console.log("?????");
      }
    } else {
    }
  });
}
resetState();