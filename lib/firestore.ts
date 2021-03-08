import firebase from "@lib/firebase";
import { User } from "./@types/auth";
import { Feedback, SiteInputData } from "./@types/firestore";

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

export async function createSite(data: SiteInputData) {
  const site = firestore.collection("sites").doc();
  await site.set(data);
  return site;
}

export async function createFeedback(data: Feedback) {
  return firestore.collection("feedback").add(data);
}

export async function deleteFeedback(id: string) {
  return firestore.collection("feedback").doc(id).delete();
}
