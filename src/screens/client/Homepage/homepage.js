
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

// :))
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
  movies.slice(0, 20).forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieItem = document.createElement("li");
    movieItem.classList.add("movie_list_item");
    movieItem.innerHTML = `
     <img src="${IMG_PATH + poster_path}" alt="${title}" style="height:580px"/>
     <div class="movie_info">
       <h5>${title}</h5>
       <span class="${getClassByRate(
         vote_average
       )}" style="display: flex;justify-content: center;"> ☆ ${vote_average}</span>
     </div>
     <div class="overview">
      <h5>${title}</h5>
      <p>${overview}</p>
     </div>
    `;
    ul.appendChild(movieItem);
  });
}

// WHEN CLICK POPULAR, CHANGE h2 TITLE TO Popular
document.querySelector("#popular").addEventListener("click", () => {
  const title = document.querySelector("h2");
  title.innerText = "POPULAR";
});

// WHEN CLICK TOP RATED, CHANGE h2 TITLE TO Top Rated
document.querySelector("#top_rated").addEventListener("click", () => {
  const title = document.querySelector("h2");
  title.innerText = "TOP RATED";
});

// WHEN CLICK UPCOMING, CHANGE h2 TITLE TO Upcoming
document.querySelector("#upcoming").addEventListener("click", () => {
  const title = document.querySelector("h2");
  title.innerText = "UPCOMING";
});


// WHEN CLICK POPULAR, LOAD POPULAR MOVIES
document.querySelector("#popular").addEventListener("click", () => {
  getMovies(API_URL);
});

// WHEN CLICK TOP RATED, LOAD TOP RATED MOVIES
document.querySelector("#top_rated").addEventListener("click", () => {
  getMovies(API_URL_TOP_RATED);
});

const API_URL_TOP_RATED =
  "https://api.themoviedb.org/3/movie/top_rated?sort_by=vote_average.desc&api_key=6bfaa39b0a3a25275c765dcaddc7dae7&page=1";

// WHEN CLICK UPCOMING, LOAD UPCOMING MOVIES
document.querySelector("#upcoming").addEventListener("click", () => {
  getMovies(API_URL_UPCOMING);
});

const API_URL_UPCOMING =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&page=1";

// WHEN CLICK COMEDY, CHANGE h2 TITLE TO Comedy AND LOAD COMEDY MOVIES
document.querySelector("#comedy").addEventListener("click", () => {
  getMovies(API_URL_COMEDY);
  const title = document.querySelector("h2");
  title.innerText = "COMEDY";
});

const API_URL_COMEDY =
  "https://api.themoviedb.org/3/discover/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&with_genres=35&sort_by=popularity.desc&page=1";
// WHEN CLICK ACTION, CHANGE h2 TITLE TO Action AND LOAD ACTION MOVIES
document.querySelector("#action").addEventListener("click", () => {
  getMovies(API_URL_ACTION);
  const title = document.querySelector("h2");
  title.innerText = "ACTION";
});

const API_URL_ACTION =
  "https://api.themoviedb.org/3/discover/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&with_genres=28&sort_by=popularity.desc&page=1";
// WHEN CLICK ANIMATION, CHANGE h2 TITLE TO Animation AND LOAD ANIMATION MOVIES
document.querySelector("#animation").addEventListener("click", () => {
  getMovies(API_URL_ANIMATION);
  const title = document.querySelector("h2");
  title.innerText = "ANIMATION";
});

const API_URL_ANIMATION =
  "https://api.themoviedb.org/3/discover/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&with_genres=16&sort_by=popularity.desc&page=1";
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


