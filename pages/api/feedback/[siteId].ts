import { NextApiRequest, NextApiResponse } from "next";
import { getAllFeedback } from "@lib/firestore-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { siteId } = req.query as { [key: string]: string };
  try {
    const feedback = await getAllFeedback(siteId);

    return res.json({ feedback });
  } catch (err) {
    res.status(500).json({ ...err });
  }
};
