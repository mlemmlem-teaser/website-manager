// import {app} from "../../../../config-firebase.js";
// console.log(app.name);
const Username =document.getElementById("form2Example3");
const Email =document.getElementById("form2Example1");
const Password =document.getElementById("form2Example2");
const dd =document.getElementById("form2Example4"); //Lấy cho có
const mm =document.getElementById("form2Example5"); //Lấy cho có
const yyyy =document.getElementById("form2Example6"); //Lấy cho có
function Usernamecheck() { 
    if (Username.value.length<=6) {
        return false;
    } else {
        return true;
    }
}

function Passwordcheck(str) {
    return (/[a-z]/.test(str) && /[A-Z]/.test(str) && /[^a-zA-Z0-9\s]/.test(str)&&str.length>=8);
}

function SignUp() {
    if (Usernamecheck()&&Passwordcheck(Password.value)) {
        let User= {
            "Email":Email.value,
            "Password":Password.value,
        }
        localStorage.setItem("User",JSON.stringify(User));
    }
    window.location.href="../Login/login.html";

}