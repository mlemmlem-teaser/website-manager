//Phần login
import { dbFireStore, Auth } from "../../../config-firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
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
    console.log(uid);
    const docRef = doc(dbFireStore, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      // name_user.innerText = data.name;
      console.log(data.name);
    } else {
      console.log("No such document!");
    }
  } else {
  }
});

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
$(document).ready(function(){
  var lastScrollTop = 0;
  var navbar = $('#header');
  var navbarHeight = navbar.outerHeight();

  $(window).scroll(function(){
    var scrollTop = $(this).scrollTop();
    if (scrollTop > lastScrollTop && scrollTop > navbarHeight){
      navbar.addClass('navbar-hidden');
    } else {
      navbar.removeClass('navbar-hidden');
    }
    lastScrollTop = scrollTop;
  });
});