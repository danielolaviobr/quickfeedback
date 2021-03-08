import { NextApiRequest, NextApiResponse } from "next";
import { getAllFeedback } from "@lib/firestore-admin";
import logger, { prepObjectKeys } from "@utils/logger";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { siteId } = req.query as { [key: string]: string };
  try {
    const feedback = await getAllFeedback(siteId);

    return res.json({ feedback });
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
      JSON.stringify(err)
    );
    res.status(500).json({ ...err });
  }
};
