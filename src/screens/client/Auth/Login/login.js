const Username =document.getElementById("form2Example3");
const Email =document.getElementById("form2Example1");
const Password =document.getElementById("form2Example2");
function SignIn() {
    const user = JSON.parse(localStorage.getItem("User"));
    if (!user) {
      alert("user chưa có");
    } else {
      if (
        user.Email == Email.value &&
        user.Password == Password.value
      ) {
        window.location.href = "../../Homepage/homepage.html";
      } else {
        console.log(user)
        console.log("error");
      }
    }
  }