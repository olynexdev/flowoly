// src/pages/api/blogs/getBlog.ts
import connectToDatabase from '@/server/config/mongoose';
import Blog from '@/server/models/Blogs';
import { handleError } from '@/server/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getBlogHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return handleError(res, 405, 'Method Not Allowed');
  }

  await connectToDatabase();

  try {
    const data = req.body;

    const id = req.query?.id;
    const result = await Blog.findByIdAndUpdate(
      id, // Filter by ID
      { $set: data },
      { new: true }
    );
    res.status(200).send(result);
  } catch (err) {
    console.log('error while updating blog', err);
    res.status(500).send({ message: 'error while updating blog', err });
  }
}
