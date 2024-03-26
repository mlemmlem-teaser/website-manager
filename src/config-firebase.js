
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js"; 
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBG2U-MZreiee9rl8iDldap6ocLbvlekFg",
    authDomain: "mlemmlem-eaa32.firebaseapp.com",
    projectId: "mlemmlem-eaa32",
    storageBucket: "mlemmlem-eaa32.appspot.com",
    messagingSenderId: "857254742466",
    appId: "1:857254742466:web:ff1893943b764b534fae5b",
    measurementId: "G-19PDF3292F"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);
  export const dbFireStore = getFirestore(app);
  export const Auth = getAuth(app);
