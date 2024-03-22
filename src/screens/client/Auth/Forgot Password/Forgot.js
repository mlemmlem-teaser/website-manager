const Forgot= document.getElementById("ForgotBtn");
const resetpassword = document.getElementById("resetpassword");
const Email = document.getElementById("form2Example1");
const Verify = document.getElementById("form2Example2");

function Emailcheck__() {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user) {
      alert("user chưa có");
    } else {
      if ( user.Email == Email.value) {
        return true;
      }
    }
}
function SendVerify() {
    if (Emailcheck__()) {
      let abcxyz=Math.floor(10000+ Math.random() * 90000);
        console.log(abcxyz);
        return abcxyz;
    }
}
function verifyCode() {
    const EnteredCode= Verify.value;
    const VerifiedCode= SendVerify();
    if (EnteredCode==VerifiedCode) {
        return true;
    }
}
function ResetPassword() {
    if (verifyCode()) {
    const user = JSON.parse(localStorage.getItem("User"));
    user.Password= resetpassword.value;
    window.location.href="../Login/login.html";
    } else {
        alert("Sai mã xác minh")
    }
}
