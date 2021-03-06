import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

let firebaseApp: firebase.app.App;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID
  });
} else {
  firebaseApp = firebase.app();
}

export default firebaseApp;
