import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { dbFireStore, Auth } from "../../../config-firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";



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
//pie
const pie = document.getElementById("pie_chart");
const pie2 = document.getElementById("pie_chart2");
const genderPP = document.getElementById("genderProperties");
const agePP = document.getElementById("ageProperties");
//Genderrrrrrrrrrrrrrrrrrrrrrrrrrrrr
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

  const malePercent = (maleCount / total) * 100;
  const femalePercent = (femaleCount / total) * 100;
  const otherPercent = (otherCount / total) * 100;
  console.log(malePercent, femalePercent, otherPercent);
  const piechart = `
  .genderRatio {
    background:
      radial-gradient(
        circle closest-side,
        transparent 60%,
        rgb(27, 32, 44) 0
      ),
      conic-gradient(
        #4e79a7 0,
        #38598b ${malePercent}%,
        #a2a8d3 0,
        #a2a8d3 ${malePercent + femalePercent}%,
        #28518a 0,
        #28518a ${malePercent + femalePercent + otherPercent}%
    );
    position: relative;
    width: 100%;
    min-height: 150px;
    margin: 0;
    margin-left: 20px;
  }
  `;
  genderPP.innerHTML = `
  <h4>Gender</h4>
            <li>Male: ${maleCount} (${malePercent}%)</li>
            <li>Female: ${femaleCount} (${femalePercent}%)</li>
            <li>Other: ${otherCount} (${otherPercent}%)</li>
            <figure class="pie-chart genderRatio">
              <figcaption>
              Male<span style="color:#38598b"></span><br>
              Female<span style="color:#a2a8d3"></span><br>
              Other<span style="color:#28518a"></span><br>
              </figcaption>
            </figure>`;
  pie.innerHTML = piechart;
}

calRatioGender();

function calculateAge(birthdate) {
  const birthday = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const m = today.getMonth() - birthday.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}

//Ageeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
async function calRatioAge() {
  let _below15_ = 0;
  let _15to65_ = 0;
  let _above65_ = 0;

  await getAllUsers().then((users) => {
    users.forEach((user) => {
      if (calculateAge(user.date) <= 15) {
        _below15_++;
      } else if (calculateAge(user.date) <= 65) {
        _15to65_++;
      } else {
        _above65_++;
      }
    });
    console.log(_below15_, _15to65_, _above65_);
    const total = _below15_ + _15to65_ + _above65_;
    const kidPercent = (_below15_ / total) * 100;
    const midPercent = (_15to65_ / total) * 100;
    const eldPercent = (_above65_ / total) * 100;
    const piechart = `
  .ageRatio {
    background:
      radial-gradient(
        circle closest-side,
        transparent 60%,
        rgb(27, 32, 44) 0
      ),
      conic-gradient(
        #28518a 0,
        #28518a ${kidPercent}%,
        teal 0,
        teal ${kidPercent + midPercent}%,
        #3ab1c8 0,
        #3ab1c8 ${kidPercent + midPercent + eldPercent}%
    );
    position: relative;
    width: 100%;
    min-height: 150px;
    margin: 0;
    margin-left: 20px;
  }
  `;
    agePP.innerHTML = `<h4 style="margin-top: 150px">Age</h4>
    <li>Below 15: ${_below15_} (${kidPercent}%)</li>
    <li>From 16-65: ${_15to65_} (${midPercent}%)</li>
    <li>65 or above: ${_above65_} (${eldPercent}%)</li>
    <figure class="pie-chart ageRatio">
      <figcaption>
        ≤15<span style="color:#28518a"></span><br>
        15-65<span style="color:teal"></span><br>
      65≤<span style="color:#3ab1c8"></span><br>
      </figcaption>
    </figure>`;
    pie2.innerHTML = piechart;
  });
}
calRatioAge();

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

  