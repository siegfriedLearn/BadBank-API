// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase } = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxqZBj7Bgx2Xg-9EAnJSWsGNLBldFRhZ8",
  authDomain: "badbank-f77f3.firebaseapp.com",
  projectId: "badbank-f77f3",
  storageBucket: "badbank-f77f3.appspot.com",
  messagingSenderId: "320431258980",
  appId: "1:320431258980:web:f36b9cdb31eac6fe0a4e71",
  databaseURL: "https://badbank-f77f3-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


module.export = {
    app,
    database
}

