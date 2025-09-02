import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/server/config/mongoose";
import TemplateFile from "@/server/models/TemplateFile";
import { handleError } from "@/server/utils/errorHandler";

export default async function postTemplateFileHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    return handleError(res, 405, "Method Not Allowed");
  }

  await connectToDatabase();

  try {
    const body = req.body;
    const result = await TemplateFile.create(body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Server error: Unable to create Template file");
  }
}
