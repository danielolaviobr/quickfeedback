import firebase from "@lib/firebase";
import getStripe from "@lib/stripe";
import { User } from "./@types/auth";
import { Feedback, Price, Product, SiteInputData } from "./@types/firestore";

const firestore = firebase.firestore();
const app = firebase.app();

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

export async function getCheckoutSession(uid: string, productId: string) {
  const { id: priceId } = await getActivePrice(productId);
  const docRef = await firestore
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
  docRef.onSnapshot(async (snapshot) => {
    const { error, sessionId } = snapshot.data();
    if (error) {
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

export async function getActivePrice(productId: string): Promise<Price> {
  return firestore
    .collection("products")
    .doc(productId)
    .collection("prices")
    .where("active", "==", true)
    .get({
      source: "server"
    })
    .then((snapshot) => {
      const singleDoc = snapshot.docs[0];
      return {
        amount: singleDoc.data()?.unit_amount,
        id: singleDoc.id,
        ...singleDoc.data()
      };
    });
}

export async function getAllProducts(): Promise<Product[]> {
  return firestore
    .collection("products")
    .where("active", "==", true)
    .get()
    .then((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      return documents;
    });
}

export async function getAllProductsWithPrice(): Promise<Product[]> {
  return firestore
    .collection("products")
    .where("active", "==", true)
    .get()
    .then(async (snapshot) => {
      const documentsPromise = snapshot.docs.map(async (doc) => {
        const price = await getActivePrice(doc.id);
        return {
          id: doc.id,
          price: price.amount,
          currency: price.currency,
          ...doc.data()
        };
      });
      const documents = (await Promise.all(documentsPromise)) as Product[];
      return documents;
    });
}

export async function goToBillingPortal() {
  const functionRef = app
    .functions("us-central1")
    .httpsCallable("ext-firestore-stripe-subscriptions-createPortalLink");
  const { data } = await functionRef({ returnUrl: window.location.origin });
  window.location.assign(data.url);
}
