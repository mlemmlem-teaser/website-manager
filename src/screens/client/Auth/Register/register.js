
import { app } from "../../../../config-firebase.js";
import { Auth } from "../../../../config-firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { dbFireStore } from "../../../../config-firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
const form = document.querySelector(".form_login");
 async function registerUser(e) {
 e.preventDefault();
 const { target } = e;
 const email = target.email.value;
 const password =target.password.value;
 const username = target.username.value;
 const date = target.date.value;
 const gender = target.gender.value;
 console.log(email,password,username,date,gender);

 function Emailcheck() {
    if(email==""||email.length<=10) {
        alert("Email không hợp lệ");
        return false
    } else {
        return true;
    }
}
function Gendercheck() {
    return gender;
};

function Usernamecheck() { 
    if (username.length<=6||["0","1","2","3","4","5","6","7","8","9"].includes((username).charAt(0))) {
        alert("Username phải trên 6 kí tự và bắt đầu bằng 1 kí tự chữ")
        return false;
    } else {
        return true;
    }
}

function Passwordcheck() {
    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[^a-zA-Z0-9\s]/.test(password)===false&&password.length>=8&&/[0-9]/.test(password)) {
        return true;
    } else if (password.length<8) {
        alert("Mật khẩu phải có ít nhất 8 kí tự")
    } else if ((/[a-z]/.test(password) && /[A-Z]/.test(password))!=true) {
        alert("Mật khẩu phải chứa cả chữ thường và chữ hoa \n ví dụ: AbcdEfgH123456")
    } else if (/[0-9]/.test(password)!=true) {
        alert("Mật khẩu phải chứa ít nhất 1 chữ số")
    } else if (/[^a-zA-Z0-9\s]/.test(password)===true) {
        alert("Mật khẩu không được chứa kí tự đặc biệt (Các kí tự nằm ngoài các chữ cái từ a - z, các chữ in hoa và chữ số)")
    }
}
function Birthcheck() {
    if (date.value=="") {
        alert("Ngày sinh không được để trống")
        return false;
    } else {
        return true;
    }
}
if (Usernamecheck()&&Passwordcheck()&&Emailcheck()&&Birthcheck()) {
    try {
        const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
        const { user} =userCredential;
        localStorage.setItem("token", user.accessToken);
        try {
            const docref = await addDoc(collection(dbFireStore,"users"),{
                username:username,
                email:email,
                id:user.uid,
                date:date,
                gender:Gendercheck()
            })
        } catch (error) {
            console.error(error);
        }
     } catch (error) {
        console.error(error);
     }
     window.location="../Login/login.html"
    }
}
form.addEventListener("submit", async (e)=> {
    registerUser(e);
})
console.log(Auth,form);

