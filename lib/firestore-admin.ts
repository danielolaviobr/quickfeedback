import { firestore } from "@lib/firebase-admin";
import { Feedback, Site } from "./@types/firestore";

export async function getAllFeedback(siteId: string) {
  try {
    const snapshot = await firestore
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();

    const feedback: Feedback[] = [];

    snapshot.forEach((doc) =>
      feedback.push({ id: doc.id, ...doc.data() } as Feedback)
    );

    return feedback;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getAllSites() {
  try {
    const snapshot = await firestore.collection("sites").get();
    const sites: Site[] = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() } as Site);
    });

    return sites;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getUsersFeedback(uid: string) {
  try {
    const snapshot = await firestore
      .collection("feedback")
      .where("authorId", "==", uid)
      .get();

    const feedback: Feedback[] = [];

    snapshot.forEach((doc) =>
      feedback.push({ id: doc.id, ...doc.data() } as Feedback)
    );

    return feedback;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getUserSites(uid: string) {
  try {
    const snapshot = await firestore
      .collection("sites")
      .where("authorId", "==", uid)
      .get();

    const sites: Site[] = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() } as Site);
    });

    return sites;
  } catch (err) {
    console.error(err);
    return [];
  }
}
