// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBweaLItF1VkYoKWsRHfudXEbN6aTd0Y28",
  authDomain: "jobhunt-f109f.firebaseapp.com",
  projectId: "jobhunt-f109f",
  storageBucket: "jobhunt-f109f.appspot.com",
  messagingSenderId: "1065414167361",
  appId: "1:1065414167361:web:a55a45ea807a87a5edefc0"
};

// Initialize Firebase
if(!firebase.apps.length){
 firebase.initializeApp(firebaseConfig);
}
export {firebase};