import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID.replace(/\\n/g, "\n")
    }),
    databaseURL: "https://quickfeedback-fa898.firebaseio.com"
  });
}

export const auth = admin.auth();
export const firestore = admin.firestore();

export default admin;
