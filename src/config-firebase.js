
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAN6CCjGYA1Yl9Xn0gbiy__Y36RI1oQAjU",
    authDomain: "website-managerment.firebaseapp.com",
    projectId: "website-managerment",
    storageBucket: "website-managerment.appspot.com",
    messagingSenderId: "362160135946",
    appId: "1:362160135946:web:9c76690db0ab1a51fd24f3",
    measurementId: "G-50LF46456V"
  };

  // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);