// src/pages/api/blogs/getCategories.ts
import connectToDatabase from '@/server/config/mongoose';
import Blog from '@/server/models/Blogs';
import { handleError } from '@/server/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getCategoriesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return handleError(res, 405, 'Method Not Allowed');
  }

  await connectToDatabase();
  const { title } = req.query as { title: string };

  try {
    if (!title) {
      return res
        .status(400)
        .send({ message: "Invalid or missing customURL parameter." });
    }

    // Normalize the customURL by replacing hyphens with spaces
    const url = title.split('-').join(' ');

    // Use a regex to match the first 5 characters of the title
    const regex = new RegExp(`^${url}`, 'i'); // Case-insensitive match

    const result = await Blog.findOne({ customURL: { $regex: regex } });

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "Blog not found!" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({
        message: "Blog details data fetch failed!",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Blog details data fetch failed!",
        error: "Unknown error",
      });
    }
  }
}
