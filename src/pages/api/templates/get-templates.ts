// src/pages/api/templates/getTemplate.ts
import connectToDatabase from "@/server/config/mongoose";
import Template from "@/server/models/Template";
import { handleError } from "@/server/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

interface Filter {
  category?: string;
  search?: string;
}

export default async function getBlogHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return handleError(res, 405, "Method Not Allowed");
  }
  await connectToDatabase();

  try {
    const query = req.query as Filter;
    const category = query.category;
    const search = query?.search;

    // Initialize an empty filterConditions object
    const filterConditions: {
      category?: string;
      $or?: Array<{ title?: RegExp; category?: RegExp }>;
    } = {};

    // Apply category filter if it is not 'all'
    if (category !== "all" && category) {
      filterConditions.category = category;
    }

    // Apply search filter if it is not 'all'
    if (search !== "all" && search !== "") {
      filterConditions.$or = [
        { title: search ? new RegExp(search, "i") : undefined },
        { category: search ? new RegExp(search, "i") : undefined },
      ];
    }

    // Fetch results from the database
    const result = await Template.find(filterConditions).sort({
      createdAt: -1,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Server error: Unable to retrieve template");
  }
}
