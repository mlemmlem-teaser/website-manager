const form = document.querySelector(".form_login");
async function LoginUser(e) {
  e.preventDefault();
  const { target } = e;
  const email = target.email.value;
  const VerifyCodeArea = target.code.value;
  //  const password =target.password.value;
  //  const username = target.username.value;
  //  const date = target.date.value;
  //  const gender = target.gender.value;
  console.log(email, password, username, date, gender);
  function generateVerifyCode() {
    let VerifyCode = Math.floor(Math.random() * 1000000);
    return VerifyCode;
  }
  function ResetPassword() {
    //đợi nào học đến thì làm
  }
  function checkVerifyCode() {
    const VerifyCode = generateVerifyCode();
    console.log(VerifyCode);
    if (VerifyCodeArea === VerifyCode) {
      return true;
    } else {
      alert("Wrong Verify Code. Try again!");
    }
  }
  try {
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".item");

  let delay = 0;
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, delay);
    delay += 95; // Delay in milliseconds between each item appearing
  });
});
