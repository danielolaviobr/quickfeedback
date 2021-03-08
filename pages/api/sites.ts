import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@lib/firebase-admin";
import { getUserSites } from "@lib/firestore-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.headers as { [key: string]: string };
    const { uid } = await auth.verifyIdToken(token);
    const sites = await getUserSites(uid);

    return res.json({ sites });
  } catch (err) {
    return res.status(500).json({ ...err });
  }
};
