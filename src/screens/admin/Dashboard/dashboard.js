import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { dbFireStore, Auth } from "../../../config-firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("MenuBtn");
  const sidebar = document.getElementById("sidebar");
  const UserManagerContainer = document.getElementById("UserManagerContainer");

  menuBtn.addEventListener("click", async function () {
    if (sidebar.style.display === "none") {
      sidebar.style.display = "flex";
      // UserManagerContainer.style.padding="100px 0 0 32vw"
      setTimeout(() => {
        sidebar.style.transform = "translateX(0)";
      }, 200);
    } else {
      sidebar.style.transform = "translateX(-20vw)";
      // UserManagerContainer.style.padding="100px 10vw 0 10vw"
      setTimeout(() => {
        sidebar.style.display = "none";
      }, 200);
    }
  });
});
const user_info = document.querySelector(".user-info");
const user_avatar = document.querySelector("#user-avatar");
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../Login/login.html";
}
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "../Login/login.html";
};
function resetState() {
  onAuthStateChanged(Auth, async (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid);
      const docRef = doc(dbFireStore, "admin", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        user_info.innerText = data.username;
        user_avatar.url =
          data.avatar != "" || data.avatar == null || data.avatar == undefined
            ? data.avatar
            : "/Assets/Images/default-user-img.webp";
      } else {
        console.log("No such document!");
      }
    } else {
    }
  });
}
resetState();
//getall user
const getAllUsers = async () => {
  const usersCollectionRef = collection(dbFireStore, "users");
  const usersQuerySnapshot = await getDocs(usersCollectionRef);
  const users = [];
  usersQuerySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};
const UserManagerContainer = document.getElementById("UserManagerContainer");
//Chart
const xValues = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const yValues = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 6, max: 16 } }],
    },
  },
});
const pie = document.getElementById("pie_chart");

async function calRatioGender() {
  let maleCount = 0;
  let femaleCount = 0;
  let otherCount = 0;

  await getAllUsers().then((users) => {
    users.forEach((user) => {
      if (user.gender === "male") {
        maleCount++;
      } else if (user.gender === "female") {
        femaleCount++;
      } else {
        otherCount++;
      }
    });
  });

  const total = maleCount + femaleCount + otherCount;

  const maleAngle = (maleCount / total) * 360;
  const femaleAngle = (femaleCount / total) * 360;
  const otherAngle = (otherCount / total) * 360;
console.log(maleAngle,femaleAngle,otherAngle);
  const piechart = `<style>
    #pieSlice1 {
      z-index: 10;
    }
    #pieSlice1 .pie {
      background-color: green;
      transform: rotate(${maleAngle}deg);
    }

    #pieSlice2 {
      transform: rotate(${maleAngle}deg);
      z-index: 9;
    }

    #pieSlice2 .pie {
      background-color: blue;
      transform: rotate(${femaleAngle}deg);
    }

    #pieSlice3 {
      transform: rotate(${maleAngle + femaleAngle}deg);
      z-index: 8;
    }

    #pieSlice3 .pie {
      background-color: red;
      transform: rotate(${otherAngle}deg);
    }
  </style>`;

  pie.innerHTML = piechart;
}

calRatioGender();
const getUserInfo = async (userId) => {
  const docRef = doc(dbFireStore, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("???????");
    return null;
  }
};

const userId = "your_user_id_here";
getUserInfo(userId)
  .then((userData) => {
    if (userData) {
      console.log("User data:", userData);
    }
  })
  .catch((error) => {
    console.log("Error fetching user data:", error);
  });
