import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { dbFireStore, Auth } from "../../../config-firebase.js";
import { collection, getDocs, getDoc, doc,updateDoc,setDoc} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { role } from "../../../contants/index.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { resetState } from "../../../../navbar.js";
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


  const UserManagerContainer = document.getElementById("UserManagerContainer");
  //Chart
  const xValues = [50,60,70,80,90,100,110,120,130,140,150];
  const yValues = [7,8,8,9,9,9,10,11,14,14,15];
  

  
  // new Chart("myChart", {
  //   type: "line",
  //   data: {
  //     labels: xValues,
  //     datasets: [{
  //       fill: false,
  //       lineTension: 0,
  //       backgroundColor: "rgba(0,0,255,1.0)",
  //       borderColor: "rgba(0,0,255,0.1)",
  //       data: yValues
  //     }]
  //   },
  //   options: {
  //     legend: {display: false},
  //     scales: {
  //       yAxes: [{ticks: {min: 6, max:16}}],
  //     }
  //   }
  // });
const form = document.querySelector("#adminForm");
const cancelBtn3 =document.getElementById("cancelBtn3");
cancelBtn3.addEventListener("click",()=>{
  form.style.display="none";
} )
  const getUserInfo = async (userId) => {
    const docRef = doc(dbFireStore, "admin", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("???????");
      return null;
    }
  };
  
  
  const getAllUsers = async () => {
    const usersCollectionRef = collection(dbFireStore, "admin");
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
function AuthTableCreate() {
  const userInformation = document.getElementById("usersInformation");
  userInformation.innerHTML="";
  getAllUsers()
  .then((allUsers) => {
    console.log(allUsers);
    allUsers.forEach((user)=>{
      const ID =document.createElement("td");  ID.classList.add("textcenter");
      const Email =document.createElement("td");  Email.innerText=user.email; Email.classList.add("padding");
      const Name =document.createElement("td"); Name.innerText=user.name!=null ? user.name : user.username; Name.classList.add("padding");
      const Birth =document.createElement("td"); Birth.innerText=user.date; Birth.classList.add("textcenter");
      const Gender =document.createElement("td"); Gender.innerText=user.gender; Gender.classList.add("textcenter");
      const Created =document.createElement("td"); Created.innerText=user.accountCreated; Created.classList.add("textcenter");
      const Setting =document.createElement("td"); Setting.classList.add("textcenter");

      const settingmodal = document.getElementById("SettingModal");
      const deletemodal = document.getElementById("DeleteModal");
      const avatarPreview = user.avatar ==""|| user.avatar == undefined||user.avatar==null ? "/Assets/Images/default-user-img.webp" : user.avatar;


const authSetting = document.createElement("i"); authSetting.classList.add("fa-solid","fa-pen","authSetting");
const authDelete = document.createElement("i"); authDelete.classList.add("fa-solid","fa-trash","authDelete");


const modal = `<form id="userForm">
<div>
    <img id="avatarPreview" src="${avatarPreview}" alt="Ảnh đại diện"> <br/> Avatar
    <input type="text" id="newAvatarUrl" value="${avatarPreview}" style="width:100%;"/>
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
      const modal2=`          Are you sure delete this account?
      <div id="DelUsername">Name: ${user.username||user.name}</div>
      <div id="DelEmail">Email: ${user.email}</div>
      <button type="button" id="cancelBtn2">Cancel</button>
      <button type="submit" id="saveBtn2">Delete</button>`
//authSetting

function OnchangeActive() {
  ID.innerText=(user.status.active==(true||"true")?"Active":"Unactive");
  if (ID.innerText=="Active") {
    ID.style.color="green";
    authDelete.classList.remove("fa-rotate-left");
    authDelete.classList.add("fa-trash");
  } else {
    ID.style.color="red";
    authDelete.classList.remove("fa-trash");
    authDelete.classList.add("fa-rotate-left");
  }
};

// function OnchangeUserInfo() {
//   const userForm= document.getElementById("userForm");
//   userForm.addEventListener("submit", (e)=>{
//     e.preventDefault();
//   })
// };
OnchangeActive();


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

  function Usernamecheck(abcde) {
    if (abcde.length <= 6 ||["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(  abcde.charAt(0))||abcde.length >=31) {
      alert("Username phải trên 6 kí tự, dưới 32 kí tự và bắt đầu bằng 1 kí tự chữ");
      return false;
    } else {
      return true;
    }
  }
  saveBtn.addEventListener("click", async (e)=>{
    e.preventDefault();
    const userDocRef = doc(dbFireStore, "admin", user.id);
    const userForm= document.getElementById("userForm");
    const avatarPreviewChange = document.getElementById("avatarPreview");
    const newAvatarUrl =document.getElementById("newAvatarUrl");
    const usernameChange = document.getElementById("username");
    const emailChange = document.getElementById("email");
    const birthChange = document.getElementById("birth");
    const genderChange = document.getElementById("gender");
    if (user.status.active=="true"||user.status.active==true) {
      if (Usernamecheck(usernameChange.value)) {
      try {
        await updateDoc(userDocRef, {
          avatar:newAvatarUrl.value,
          username:usernameChange.value,
          email:emailChange.value,
          date:birthChange.value,
          gender:genderChange.value,

        },{merge: true});
        resetState();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Username phải trên 6 kí tự, dưới 32 kí tự và bắt đầu bằng 1 kí tự chữ");
    }
    } else {
      alert("have to active this user");
    }
    userForm.style.display="none";
    AuthTableCreate();
    resetState();
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
      deletemodal.style.display = "none";
      const userDocRef = doc(dbFireStore, "admin", user.id);
      if (user.status.active=="true"||user.status.active==true) {
      try {
        await updateDoc(userDocRef, {
          status: {
            active: false,
          },
        },{merge: true});
      } catch (error) {
      }
    } else {
      try {
        await updateDoc(userDocRef, {
          status: {
            active: true,
            role:"admin",
          },
        },{merge: true});
      } catch (error) {
      }
    }
      AuthTableCreate();
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



      tr.appendChild(Email);
      tr.appendChild(Name);
      tr.appendChild(Birth);
      tr.appendChild(Gender);
      tr.appendChild(Created);
      tr.appendChild(ID);
      tr.appendChild(Setting);

      userInformation.appendChild(tr);
    }
    )
  })
  .catch((error) => {
    console.log("Error fetching all users:", error);
  });
};
AuthTableCreate();
  //admin

  async function CreateAdmin(e) {
      e.preventDefault();
      const { target } = e;
      const email = target.adminemail.value;
      const password = target.adminpassword.value;
      const username = target.adminname.value;
      const date = target.adminbirth.value;
      const gender = target.admingender.value;
      let time = Date();
      let times = time.split(" ");
      const created = `${times[3]} ${times[2]} ${times[1]} ${times[0]}`;
      console.log(email, password, username, date, gender);
    
      function Emailcheck() {
        if (email == "" || email.length <= 10) {
          alert("Email không hợp lệ");
          return false;
        } else {
          return true;
        }
      }
      function Gendercheck() {
        return gender;
      }
    
      function Usernamecheck() {
        if (
          username.length <= 6 ||
          ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
            username.charAt(0) ||
            username.length >=31
          )
        ) {
          alert("Username phải trên 6 kí tự, dưới 32 kí tự và bắt đầu bằng 1 kí tự chữ");
          return false;
        } else {
          return true;
        }
      }
    
      function Passwordcheck() {
        if (
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /[^a-zA-Z0-9\s]/.test(password) === false &&
          password.length >= 8 &&
          /[0-9]/.test(password)
        ) {
          return true;
        } else if (password.length < 8) {
          alert("Mật khẩu phải có ít nhất 8 kí tự");
        } else if ((/[a-z]/.test(password) && /[A-Z]/.test(password)) != true) {
          alert(
            "Mật khẩu phải chứa cả chữ thường và chữ hoa \n ví dụ: AbcdEfgH123456"
          );
        } else if (/[0-9]/.test(password) != true) {
          alert("Mật khẩu phải chứa ít nhất 1 chữ số");
        } else if (/[^a-zA-Z0-9\s]/.test(password) === true) {
          alert(
            "Mật khẩu không được chứa kí tự đặc biệt (Các kí tự nằm ngoài các chữ cái từ a - z, các chữ in hoa và chữ số)"
          );
        }
      }
      function Birthcheck() {
        if (date.value == "") {
          alert("Ngày sinh không được để trống");
          return false;
        } else {
          return true;
        }
      }
      if (Usernamecheck() && Passwordcheck() && Emailcheck() && Birthcheck()) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            Auth,
            email,
            password
          );
          const { user } = userCredential;
          try {
            await setDoc(doc(dbFireStore, role.admin, user.uid), {
              avatar:"/Assets/Images/default-user-img.webp",
              username: username,
              email: email,
              id: user.uid,
              date: date,
              gender: Gendercheck(),
              accountCreated: created,
              status: {
                role: "admin",
                active: true,
              },
            });
          } catch (error) {
            console.error(error);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
form.addEventListener("submit", async (e)=> {
  await CreateAdmin(e);
  form.style.display="none";
  AuthTableCreate();
  await resetState();
})
function openForm() {
  form.style.display="inherit";
}
document.getElementById("small-button").addEventListener("click",() => {
  openForm();
});
