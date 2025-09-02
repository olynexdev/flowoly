/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/api/Templates/getTemplate.ts
import { deleteImageFromS3 } from '@/lib/delete-image-s3';
import connectToDatabase from '@/server/config/mongoose';
import Template from '@/server/models/Template';
import { handleError } from '@/server/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getTemplateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    return handleError(res, 405, 'Method Not Allowed');
  }

  await connectToDatabase();
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .send({ message: 'Error delete Template undefined id' });
    }

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
    if (!bucketName) {
      return res
        .status(500)
        .send({ message: 'AWS bucket name is not defined' });
    }
    const res2 = await deleteImageFromS3(bucketName, template, 'Template_data');

    const result = await Template.findByIdAndDelete(id);
    res.status(200).send(result);
  } catch (err) {
    console.log('error in deleting Template:', err);
    res.status(500).send({ message: 'error in deleting Template' });
  }
}
