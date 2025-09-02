// src/pages/api/users/getUser.ts

import connectToDatabase from "@/server/config/mongoose";
import AuthUser from "@/server/models/User";
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
    const { email } = req.query;

    if (!email) {
      res.send({ message: "Undefined Email" });
    }

    // If an ID is provided, fetch a single user; otherwise, fetch all users
    const user = await AuthUser.findOne({ email: email });

    if (!user) {
      return handleError(res, 404, "User not found");
    }

    const admin = user.role === "admin";

    res.status(200).send({ admin });
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Server error: Unable to retrieve user!");
  }
}
