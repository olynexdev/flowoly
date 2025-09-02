// src/pages/api/templates/getTemplate.ts
import connectToDatabase from '@/server/config/mongoose';
import Template from '@/server/models/Template';
import { handleError } from '@/server/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getTemplateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return handleError(res, 405, 'Method Not Allowed');
  }

  await connectToDatabase();

  try {
    const data = req.body;

    const id = req.query?.id;
    const result = await Template.findByIdAndUpdate(
      id, // Filter by ID
      { $set: data },
      { new: true }
    );
    console.log(result, 'result in api');
    res.status(200).send(result);
  } catch (err) {
    console.log('error while updating template', err);
    res.status(500).send({ message: 'error while updating template', err });
  }
}
