// src/utils/errorHandler.ts
import { NextApiResponse } from 'next';

export function handleError(res: NextApiResponse, statusCode: number, message: string) {
  res.status(statusCode).json({ success: false, message });
}
