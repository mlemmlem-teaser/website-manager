import { Auth, dbFireStore } from "../../../config-firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
    // localStorage.setItem("token", user.accessToken);
    onAuthStateChanged(Auth, async (user_) => {
      if (user_) {
        const uid = user_.uid;
        console.log(uid);
        const docRef = doc(dbFireStore, "admin", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log(data);
          if (data.status.role == "admin") {
            window.location.href = "../Dashboard/dashboard.html";
          } else {
            window.location.href = "../../client/Homepage/homepage.html";
          }
        } else {
          console.log("No such document!");
        }
      }
    });
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
};

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  await loginUser(e);
});

