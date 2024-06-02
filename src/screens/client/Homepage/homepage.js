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

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6bfaa39b0a3a25275c765dcaddc7dae7&page=1&include_video=true";
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
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieItem = document.createElement("li");
    movieItem.classList.add("movie_list_item");
    movieItem.innerHTML = `
    
     <img src="${IMG_PATH + poster_path}" alt="${title}" style="height:480px"/>
     <div class="movie_info">
       <h5>${title}</h5>
       <span class="${getClassByRate(
         vote_average
       )}" style="display: flex;justify-content: center;"> ☆ ${vote_average}</span>
     </div>
     <div class="overview">
      <h5 style="cursor:pointer" >${title}</h5>
      <p>${overview}</p>
      <p style=" color: #fff;
text-shadow: 0 0 3px #fff, 0 0 6px #fff, 0 0 9px #fff, 0 0 12px #fff;font-weight:bold;">Date:${new Date(
      movie.release_date
    ).toLocaleDateString()}</p>
     </div>
    `;
    ul.appendChild(movieItem);
  });
}

// Hiển thị bộ phim nổi tiếng nhất trong class top
async function showTopRatedMovie() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=6bfaa39b0a3a25275c765dcaddc7dae7"
  );
  const data = await res.json();
  const topRatedMovies = data.results;
  let currentIndex = 0;

  function displayMovie() {
    const topRatedMovie = topRatedMovies[currentIndex];
    const { title, poster_path, vote_average, overview } = topRatedMovie;
    const topRatedMovieItem = document.querySelector(".top");
    topRatedMovieItem.innerHTML = `
    <div class="lol" style="background-image: url('${
      IMG_PATH + poster_path
    }');background-size: cover;background-repeat: no-repeat;background-position: center;height: 550px;padding-right: 130px;">
    
     <div class="movie_info" style=" margin-top: 65px;
  margin-left: 1000px;">
  <div class="toxt" style="text-shadow: 0 0 3px rgba(255,255,255,0.7), 0 0 6px rgba(255,255,255,0.7), 0 0 9px rgba(255,255,255,0.7), 0 0 12px rgba(255,255,255,0.7);">
       <h3 style="position:absolute;color: black;left:4%;z-index: 1000;">${title}</h3>
       <p  style="position:absolute;color: #000;font-size: 20px;left:4%;width: 500px;margin-top: 60px;z-index: 1000">${overview}</p>
       <p style="position:absolute;color: #000;font-size: 15px;left:4%;width: 500px;bottom:-150px;z-index: 1000">Date:${new Date(
      topRatedMovie.release_date
    ).toLocaleDateString()}</p>
       </div>
       <div class="lop">
        <img src="${
          IMG_PATH + poster_path
        }" alt="${title}" class="poster" style="height:430px;width:270px;padding:0;opacity: 0; animation: fadeIn 1s forwards;padding:0;margin-top: 12px;z-index: 1000">
         <span class="${getClassByRate(
           vote_average
         )}" style="display: flex;justify-content: center;border-radius: 0px;width: 270px;z-index: 1000;opacity: 0; animation: fadeIn 1s forwards;"> ☆ ${vote_average}</span>
       </div>
      </div>
    </div>
     
    `;

    currentIndex = (currentIndex + 1) % topRatedMovies.length;
    setTimeout(displayMovie, 3000);
  }

  setTimeout(displayMovie, 1000);
}

showTopRatedMovie();

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

document.querySelector(".search-input").addEventListener("click", function () {
  document.querySelector(".search-results").style.opacity = 0;
  document.querySelector(".search-results").style.display = "block";
  setTimeout(function () {
    document.querySelector(".search-results").style.opacity = 1;
    document.querySelector(".search-results").style.animation =
      "fadeIn 0.5s ease-in-out forwards";
  }, 10);
});
document.querySelector(".search-results").style.display = "none";

// When not click search input, search results will be hidden
document.addEventListener("click", function (e) {
  if (
    !e.target.closest(".search-input") &&
    document.querySelector(".search-results").style.display !== "none"
  ) {
    document.querySelector(".search-results").style.animation =
      "fadeOut 0.5s ease-in-out forwards";
    setTimeout(function () {
      document.querySelector(".search-results").style.display = "none";
    }, 400);
  }
});

document.querySelector(".search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = document.querySelector(".search-input").value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=6bfaa39b0a3a25275c765dcaddc7dae7&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  )
    .then((res) => res.json())
    .then((data) => {
      const searchResult = document.querySelector(".search-results");
      searchResult.innerHTML = "";
      const movies = data.results.filter(
        (movie) =>
          movie.poster_path &&
          movie.title &&
          movie.vote_average &&
          movie.overview &&
          movie.release_date
      );
      movies.forEach((movie) => {
        const movieCard = `
          <li class="movie_list_item" style="border-radius: 0px;overflow-y:auto;background-color: #000000">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" />
            <div class="movie_info" style="height:auto">
               <h5>${movie.title}</h5>
               <p class="movie-overview" style="font-size: 12px;">${movie.overview}</p>
               <p class="movie-release-date" style="font-size: 12px;">Date: ${movie.release_date}</p>
               <span class="movie-rating" style="font-size: 12px;color: #FFC107;">
                <span style="display: flex; width: 100%; text-align: center;">
                  <span style="display: flex; width: ${movie.vote_average*10}%; background-color: #FFC107;position: absolute;justify-content: center;"></span>
                </span>
                
               ☆ ${movie.vote_average}
               </span>
            </div>
          </li>
        `;
        searchResult.insertAdjacentHTML("beforeend", movieCard);
      });
    })
    .catch((error) => {
      alert("Error fetching search results:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");

  let delay = 0;
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, delay);
    delay += 200; // Delay in milliseconds between each item appearing
  });
});
