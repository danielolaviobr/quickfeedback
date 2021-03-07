import firestore from "@lib/firebase-admin";
import { Feedback, Site } from "./@types/firestore";

export async function getAllFeedback(siteId: string) {
  const snapshot = await firestore
    .collection("feedback")
    .where("siteId", "==", siteId)
    .get();

  const feedback: Feedback[] = [];

  snapshot.forEach((doc) =>
    feedback.push({ id: doc.id, ...doc.data() } as Feedback)
  );

  return feedback;
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
    return [];
  }
}
