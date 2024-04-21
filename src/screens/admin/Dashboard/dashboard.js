import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { dbFireStore, Auth } from "../../../config-firebase.js";
import { collection, getDocs, getDoc, doc,updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('MenuBtn');
    const sidebar = document.getElementById('sidebar');
    const UserManagerContainer = document.getElementById("UserManagerContainer");
  
    menuBtn.addEventListener('click',async function () {
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'flex';
            // UserManagerContainer.style.padding="100px 0 0 32vw"
            setTimeout(()=>{
              sidebar.style.transform = 'translateX(0)';
          },200)
        } else {
            sidebar.style.transform = 'translateX(-20vw)';
            // UserManagerContainer.style.padding="100px 10vw 0 10vw"
            setTimeout(() => {
                sidebar.style.display = 'none';

            }, 200);
        }
    });
  });
const user_info = document.querySelector(".user-info");
const user_avatar =document.querySelector("#user-avatar");
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../../client/Auth/Login/login.html";
}
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "../../client/Auth/Login/login.html";
};
function resetState() {
onAuthStateChanged(Auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    const docRef = doc(dbFireStore, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);
      user_info.innerText = data.username;
      user_avatar.url = (data.avatar!=""||data.avatar==null||data.avatar==undefined) ? data.avatar : "/Assets/Images/default-user-img.webp";

    } else {
      console.log("No such document!");
    }
  } else {
  }
});
};
resetState();
  const UserManagerContainer = document.getElementById("UserManagerContainer");
  //Chart
  const xValues = [50,60,70,80,90,100,110,120,130,140,150];
  const yValues = [7,8,8,9,9,9,10,11,14,14,15];
  

  
  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
        yAxes: [{ticks: {min: 6, max:16}}],
      }
    }
  });

  
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
  
  
  const getAllUsers = async () => {
    const usersCollectionRef = collection(dbFireStore, "users");
    const usersQuerySnapshot = await getDocs(usersCollectionRef);
    const users = [];
    usersQuerySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    return users;
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
