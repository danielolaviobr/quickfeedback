import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID
  });
}

export default firebase;
