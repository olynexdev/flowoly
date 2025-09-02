import connectToDatabase from '@/server/config/mongoose';
import { sendEmail } from '@/server/services/sendContactMessage';
import { handleError } from '@/server/utils/errorHandler';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function postContactMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return handleError(res, 405, 'Method Not Allowed');
  }

  await connectToDatabase();

  try {
    const data = req?.body; // message request

    try {
      sendEmail(data);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to send email', error });
    }
  } catch (error) {
    console.error(error);
    handleError(res, 500, 'Server error: Unable to retrieve user');
  }
}
