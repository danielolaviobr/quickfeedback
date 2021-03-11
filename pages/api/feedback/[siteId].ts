import { NextApiRequest, NextApiResponse } from "next";
import { getAllFeedback, getSite } from "@lib/firestore-admin";
import logger, { prepObjectKeys } from "@utils/logger";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { siteId } = req.query as { [key: string]: string };
  try {
    const feedback = await getAllFeedback(siteId);
    const site = await getSite(siteId);

    return res.json({ feedback, site });
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
    res.status(500).json({ ...err });
  }
};
