// import {app} from "../../../../config-firebase.js";
// console.log(app.name);
const Username =document.getElementById("form2Example3");
const Email =document.getElementById("form2Example1");
const Password =document.getElementById("form2Example2");
const date =document.getElementById("form2Example4");

function Emailcheck() {
    if(Email.value==""||Email.value.length<=10) {
        alert("Email không hợp lệ");
        return false
    } else {
        return true;
    }
}
function Gendercheck() {
    const male= document.getElementById("male");
    const female= document.getElementById("female");
    const other= document.getElementById("other");
    if (male.checked) {
        return male.value;
    }
    if (female.checked) {
        return female.value;
    }
    if (other.checked) {
        return other.value;
    }
};

function Usernamecheck() { 
    if (Username.value.length<=6||["0","1","2","3","4","5","6","7","8","9"].includes((Username.value).charAt(0))) {
        alert("Username phải trên 6 kí tự và bắt đầu bằng 1 kí tự chữ")
        return false;
    } else {
        return true;
    }
}

function Passwordcheck(str) {
    if (/[a-z]/.test(str) && /[A-Z]/.test(str) && /[^a-zA-Z0-9\s]/.test(str)===false&&str.length>=8&&/[0-9]/.test(str)) {
        return true;
    } else if (str.length<8) {
        alert("Mật khẩu phải có ít nhất 8 kí tự")
    } else if ((/[a-z]/.test(str) && /[A-Z]/.test(str))!=true) {
        alert("Mật khẩu phải chứa cả chữ thường và chữ hoa \n ví dụ: AbcdEfgH123456")
    } else if (/[0-9]/.test(str)!=true) {
        alert("Mật khẩu phải chứa ít nhất 1 chữ số")
    } else if (/[^a-zA-Z0-9\s]/.test(str)===true) {
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

function SignUp() {
    if (Usernamecheck()&&Passwordcheck(Password.value)&&Emailcheck()&&Birthcheck()) {
        let User= {
            "Email":Email.value,
            "Username":Username.value,
            "Password":Password.value,
            "Gender":Gendercheck(),
            "Date": date.value,
        }
        localStorage.setItem("User",JSON.stringify(User));
        window.location.href="../Login/login.html";
    }
}