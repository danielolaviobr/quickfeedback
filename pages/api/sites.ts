import { NextApiRequest, NextApiResponse } from "next";
import firestore from "@lib/firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sitesSnapshot = await firestore.collection("sites").get();

    const sites = sitesSnapshot.docs.map((doc) => {
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      }
    });
    return res.json({ sites });
  } catch (err) {
    res.status(500).json({ ...err });
  }
};
