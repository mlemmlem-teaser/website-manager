//Phần login
import { dbFireStore, Auth } from "../../../config-firebase.js";
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
  window.location.href = "../Auth/Login/login.html";
}
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "../Auth/Login/login.html";
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
  <input type="text" id="newAvatarUrl" value="/Assets/Images/default-user-img.webp" style="width:100%;"/>
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
        user_avatar.src = data.avatar = undefined
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
        user_avatar.src = data.avatar = undefined
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
// const userId = "your_user_id_here";
// getUserInfo(userId)
//   .then((userData) => {
//     if (userData) {
//       console.log("User data:", userData);
//     }
//   })
//   .catch((error) => {
//     console.log("Error fetching user data:", error);
//   });

// // Sử dụng hàm để lấy tất cả người dùng
// getAllUsers()
//   .then((allUsers) => {
//     console.log("All users:", allUsers);
//   })
//   .catch((error) => {
//     console.log("Error fetching all users:", error);
//   });
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

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6bfaa39b0a3a25275c765dcaddc7dae7&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&query="';

const ul = document.getElementById("movieUl");
const form = document.getElementById("searchForm");
const search = document.getElementById("search");

// initial Movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

// SHOW MOVIES LIST
function showMovies(movies) {
  console.log(movies);
  ul.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieItem = document.createElement("li");
    movieItem.classList.add("movie_list_item");
    movieItem.innerHTML = `
     <img src="${IMG_PATH + poster_path}" alt="${title}" />
     <div class="movie_info">
       <h3>${title}</h3>
       <span class="${getClassByRate(vote_average)}">${vote_average}</span>
     </div>
     <div class="overview">
      <h3>Overview</h3>
      <p>${overview}</p>
     </div>
    `;
    ul.appendChild(movieItem);
  });
}
// FOR RATE
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
// FOR SEARCH SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
$(document).ready(function () {
  var lastScrollTop = 0;
  var navbar = $("#header");
  var navbarHeight = navbar.outerHeight();

  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
      navbar.addClass("navbar-hidden");
    } else {
      navbar.removeClass("navbar-hidden");
    }
    lastScrollTop = scrollTop;
  });
});
