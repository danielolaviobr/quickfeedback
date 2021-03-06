import firebase from "@lib/firebase";
import { User } from "./@types/auth";
import { Site, SiteData } from "./@types/firestore";

const firestore = firebase.firestore();

export async function createUser(user: User) {
  return firestore
    .collection("users")
    .doc(user.uid)
    .set(
      {
        ...user
      },
      { merge: true }
    );
}

export async function createSite(data: SiteData) {
  return firestore.collection("sites").add(data);
}
