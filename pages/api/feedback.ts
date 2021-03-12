import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@lib/firebase-admin";
import { getSite, getUsersFeedback } from "@lib/firestore-admin";
import logger, { prepObjectKeys } from "@utils/logger";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.headers as { [key: string]: string };
    const { uid } = await auth.verifyIdToken(token);
    const feedback = await getUsersFeedback(uid);
    console.log("here");
    const feedbackWithSitePromise = feedback.map(async (fb) => ({
      site: await getSite(fb.siteId),
      ...fb
    }));

    const feedbackWithSite = await Promise.all(feedbackWithSitePromise);

    console.log("Feedback with site", feedbackWithSite);

    return res.json({ feedback: feedbackWithSite });
  } catch (err) {
    logger.error(
      {
        request: {
          headers: prepObjectKeys(req.headers),
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      err.message
    );
    return res.status(500).json({ ...err });
  }
};
