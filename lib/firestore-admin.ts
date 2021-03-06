import firestore from "@lib/firebase-admin";

export async function getAllFeedback(siteId: number) {
  const snapshot = await firestore
    .collection("feedbacks")
    .where("siteId", "==", siteId)
    .get();

  const feedbacks = [];

  snapshot.forEach((doc) => feedbacks.push({ id: doc.id, ...doc.data() }));

  return feedbacks;
}
