import { Auth, dbFireStore } from "/src/config-firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
const formLogin = document.querySelector(".form_login");

const getUserInfo = async (userId) => {
  const docRef = doc(dbFireStore, "users", userId);
  const docRef2 = doc(dbFireStore, "admin", userId);
  const docSnap = await getDoc(docRef);
  const docSnap2 = await getDoc(docRef2);
  if (docSnap.exists()) {
    return docSnap.data();
  } else if (docSnap2.exists()) {
    return docSnap2.data();
  } else {
    console.log("???????");
    return null;
  }
};

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
      getUserInfo(user.uid).then((data) => {
        if (data.status.active == true) {
          window.location.href = "/src/screens/client/Homepage/homepage.html";
        } else {
          console.log(data);
          alert("Have to active this account");
        }
      });
    }
  } catch (error) {
    alert("Login failed");
  }
};

formLogin.addEventListener("submit", async (e) => await loginUser(e));

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
