// src/pages/api/blogs/getCategories.ts
import connectToDatabase from '@/server/config/mongoose';
import Blog from '@/server/models/Blogs';
import { handleError } from '@/server/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getCategoriesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return handleError(res, 405, 'Method Not Allowed');
    }

    await connectToDatabase();

    // Fetch unique categories from the Blog collection
    const categories = await Blog.distinct('category');

    // Respond with the categories array
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    handleError(res, 500, 'Server error: Unable to retrieve categories');
  }
}
