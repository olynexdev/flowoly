import connectToDatabase from "@/server/config/mongoose";
import Blog from "@/server/models/Blogs";
import { handleError } from "@/server/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getBlogHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return handleError(res, 405, "Method Not Allowed");
  }

  await connectToDatabase();
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .send({ message: "Error delete blog undefined id" });
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
    if (!bucketName) {
      return res
        .status(500)
        .send({ message: "AWS bucket name is not defined" });
    }

    const result = await Blog.findByIdAndDelete(id);
    res.status(200).send(result);
  } catch (err) {
    console.log("error in deleting blog:", err);
    res.status(500).send({ message: "error in deleting blog" });
  }
}
