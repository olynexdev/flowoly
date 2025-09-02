// src/pages/api/users/getUser.ts

import connectToDatabase from "@/server/config/mongoose";
import User from "@/server/models/User";
import { handleError } from "@/server/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return handleError(res, 405, "Method Not Allowed");
  }
  await connectToDatabase();
  try {
    const { id } = req.query;

    // If an ID is provided, fetch a single user; otherwise, fetch all users
    const user = id ? await User.findOne({ userId: id }) : await User.find({});

    if (!user) {
      return handleError(res, 404, "User not found");
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Server error: Unable to retrieve user");
  }
}
