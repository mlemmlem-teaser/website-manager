import { Auth, dbFireStore } from "../../../../config-firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const formLogin = document.querySelector(".form_login");

const loginUser = async (e) => {
  e.preventDefault();
  const { target } = e;
  const email = target.email.value;
  const password = target.password.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      Auth,
      email,
      password
    );
    const { user } = userCredential;
    localStorage.setItem("token", user.accessToken);
    if (user.accessToken) {
      window.location.href = "../../Homepage/homepage.html";
    }
  } catch (error) {
    alert("Login failed");
  }
};

formLogin.addEventListener("submit", async (e) => await loginUser(e));
