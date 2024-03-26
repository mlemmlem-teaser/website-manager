// const Username =document.getElementById("form2Example3");
// const Email =document.getElementById("form2Example1");
// const Password =document.getElementById("form2Example2");
// function SignIn() {
//     const user = JSON.parse(localStorage.getItem("User"));
//     if (!user) {
//       alert("user chưa có");
//     } else {
//       if (
//         user.Email == Email.value &&
//         user.Password == Password.value
//       ) {
//         window.location.href = "../../Homepage/homepage.html";
//       } else {
//         console.log(user)
//         console.log("error");
//       }
//     }
//   }
const form = document.querySelector(".form_login");
 async function LoginUser(e) {
 e.preventDefault();
 const { target } = e;
 const email = target.email.value;
 const password =target.password.value;
 const username = target.username.value;
 const date = target.date.value;
 const gender = target.gender.value;
 console.log(email,password,username,date,gender); 
}
