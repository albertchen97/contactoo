import firebase from "firebase/app";
import "firebase/auth";

// init our app using the following parameters and then get auth() service for that app
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCiLB0Revd_m-zmbzHH-ouy00oi46eJNeE",
    authDomain: "unichat-f1e5b.firebaseapp.com",
    projectId: "unichat-f1e5b",
    storageBucket: "unichat-f1e5b.appspot.com",
    messagingSenderId: "1096083175418",
    appId: "1:1096083175418:web:e7193b9e2513ec7b409643"
}).auth()