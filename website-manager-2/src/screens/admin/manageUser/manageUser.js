




document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('MenuBtn');
    const sidebar = document.getElementById('sidebar');
  
    menuBtn.addEventListener('click',async function () {
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


  //Auth
  import { dbFireStore, Auth } from "../../../config-firebase.js";
  import { collection, getDocs, getDoc, doc,updateDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
  import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
  // const name_user = document.querySelector(".name_user");
  // onAuthStateChanged(Auth, async (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log(uid);
  //     const docRef = doc(dbFireStore, "users", uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       name_user.innerText = data.name;
  //       console.log(data.name);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } else {
  //   }
  // });
  
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

// Sử dụng hàm để lấy tất cả người dùng
getAllUsers()
  .then((allUsers) => {
    console.log(allUsers);
    let indexOfUser =1;
    allUsers.forEach((user)=>{
      console.log(user);
      const ID =document.createElement("td"); ID.innerText=`${indexOfUser}`; indexOfUser++; ID.classList.add("textcenter");
      const Email =document.createElement("td");  Email.innerText=user.email; Email.classList.add("padding");
      const Name =document.createElement("td"); Name.innerText=user.name!=null ? user.name : user.username; Name.classList.add("padding");
      const Birth =document.createElement("td"); Birth.innerText=user.date; Birth.classList.add("textcenter");
      const Gender =document.createElement("td"); Gender.innerText=user.gender; Gender.classList.add("textcenter");
      const Created =document.createElement("td"); Created.innerText=user.accountCreated; Created.classList.add("padding");
      const Setting =document.createElement("td"); Setting.classList.add("textcenter");

      const settingmodal = document.getElementById("SettingModal");
      const deletemodal = document.getElementById("DeleteModal");
      const avatarPreview = user.avatar ==""|| user.avatar == undefined||user.avatar==null ? "/Assets/Images/default-user-img.webp" : user.avatar;


const authSetting = document.createElement("i"); authSetting.classList.add("fa-solid","fa-gear","authSetting");
const authDelete = document.createElement("i"); authDelete.classList.add("fa-solid","fa-trash","authDelete");


const modal = `<form id="userForm">
<div>
    <img id="avatarPreview" src="${avatarPreview}" alt="Ảnh đại diện">
</div>
<div>
    <label for="username">Username:</label>
    <input type="text" id="username" value="${user.name||user.username}"required>
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
    <select name="gender" required>
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
      const modal2=`          Are you sure delete this account?
      <div id="DelUsername">Name: ${user.username||user.name}</div>
      <div id="DelEmail">Email: ${user.email}</div>
      <button type="button" id="cancelBtn2">Cancel</button>
      <button type="submit" id="saveBtn2">Delete</button>`
//authSetting
authSetting.addEventListener("click",()=>{
  settingmodal.innerHTML=modal;
  const userForm= document.getElementById("userForm");
  userForm.style.display="inherit";

  const cancelBtn = document.getElementById("cancelBtn");
  const saveBtn = document.getElementById("saveBtn");
  cancelBtn.addEventListener("click",()=>{
    const userForm= document.getElementById("userForm");
    userForm.style.display="none";
  });
  saveBtn.addEventListener("click",()=>{
  
    const userForm= document.getElementById("userForm");
    userForm.style.display="none";
  });
});
//authDelete
authDelete.addEventListener("click",()=>{
  deletemodal.innerHTML=modal2;
  deletemodal.style.display="inherit";
  const cancelBtn2 = document.getElementById("cancelBtn2");
  const saveBtn2 = document.getElementById("saveBtn2");
  cancelBtn2.addEventListener("click",()=>{
    deletemodal.style.display="none";
  });
  saveBtn2.addEventListener("click",async ()=>{
  
    deletemodal.style.display="none";
    {
      deletemodal.style.display = "none";
    
      // Get the user document reference
      const userDocRef = doc(dbFireStore, "users", user.id);
    
      try {
        // Update the user document's 'active' field to 'false'
        await updateDoc(userDocRef, {
          status: {
            active: false,
          },
        },{merge: true});
        console.log("User's active field has been set to false.");
      } catch (error) {
        console.error("Error setting user's active field to false:", error);
      }
    }
  });
})



      if (user.gender==undefined) {
        Gender.innerText="No Info"
      }
      if (user.date==undefined) {
        Birth.innerText="No Info"
      }
      const tr = document.createElement("tr");
      Setting.appendChild(authSetting);
      Setting.appendChild(authDelete);
      tr.appendChild(ID);
      tr.appendChild(Email);
      tr.appendChild(Name);
      tr.appendChild(Birth);
      tr.appendChild(Gender);
      tr.appendChild(Created);
      tr.appendChild(Setting);
      const userInformation = document.getElementById("usersInformation");
      userInformation.appendChild(tr);
    }
    )
  })
  .catch((error) => {
    console.log("Error fetching all users:", error);
  });