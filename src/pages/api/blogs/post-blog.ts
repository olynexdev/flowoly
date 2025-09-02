// src/pages/api/blogs/getBlog.ts
import connectToDatabase from '@/server/config/mongoose';
import Blog from '@/server/models/Blogs';
import { handleError } from '@/server/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getBlogHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return handleError(res, 405, 'Method Not Allowed');
  }

  await connectToDatabase();

  try {
    const body = req.body;
    const result = await Blog.create(body);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handleError(res, 500, 'Server error: Unable to retrieve blog');
  }
}
