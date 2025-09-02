import connectToDatabase from "@/server/config/mongoose";
import Template from "@/server/models/Template";
import { handleError } from "@/server/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getTemplateBySlugHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return handleError(res, 405, "Method Not Allowed");
  }

  await connectToDatabase();
  const { slug } = req.query as { slug: string };

  try {
    if (!slug) {
      return res
        .status(400)
        .send({ message: "Invalid or missing customURL parameter." });
    }

    const result = await Template.findOne({ customURL: slug });

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Template not found!" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({
        message: "Template details data fetch failed!",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Template details data fetch failed!",
        error: "Unknown error",
      });
    }
  }
}
