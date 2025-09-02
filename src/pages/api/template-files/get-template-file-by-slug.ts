import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/server/config/mongoose";
import DownloadToken from "@/server/models/DownloadToken";
import TemplateFile from "@/server/models/TemplateFile";
import AuthUserCollection from "@/server/models/User";
import Payment from "@/server/models/Payment";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

function parseCookieHeader(header?: string, name?: string) {
  if (!header || !name) return undefined;
  const parts = header.split(";").map((p) => p.trim());
  const match = parts.find((p) => p.startsWith(name + "="));
  if (!match) return undefined;
  const idx = match.indexOf("=");
  return decodeURIComponent(match.slice(idx + 1));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!SECRET_KEY) {
    console.error("SECRET_KEY not configured in environment");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  await connectToDatabase();

  try {
    const { slug } = req.query as { slug: string };
    if (!slug) {
      return res.status(400).json({ message: "Slug parameter is required" });
    }

    // Get token from cookie
    const encryptedToken: string | undefined =
      (req.cookies && (req.cookies as any).accessToken) ||
      parseCookieHeader(req.headers.cookie, "accessToken");

    if (!encryptedToken) {
      return res.status(401).json({ message: "Access token is required" });
    }

    // Verify the token
    const downloadToken = await DownloadToken.findOne({
      token: encryptedToken,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!downloadToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Check if token has access to this slug
    if (downloadToken.slug !== slug) {
      return res
        .status(403)
        .json({ message: "Token does not have access to this resource" });
    }

    // For admin requests, just return the template file
    if (downloadToken.role === "admin") {
      const findAdmin = await AuthUserCollection.findOne({
        email: downloadToken.email,
        role: "admin",
      });
      if (!findAdmin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const regex = new RegExp(`^${slug}`, "i");
      const templateFile = await TemplateFile.findOne({
        templateSlug: { $regex: regex },
      });

      if (!templateFile) {
        return res.status(404).json({ message: "Template file not found" });
      }

      return res.status(200).json({ data: templateFile });
    }

    // For user purchases, verify payment status
    if (downloadToken.role === "user" && downloadToken.transactionId) {
      const payment = await Payment.findOne({
        transactionId: downloadToken.transactionId,
        status: "completed",
        email: downloadToken.email,
      });

      if (!payment) {
        return res.status(402).json({ message: "Payment not verified" });
      }

      const regex = new RegExp(`^${slug}`, "i");
      const templateFile = await TemplateFile.findOne({
        customURL: { $regex: regex },
      });

      if (!templateFile) {
        return res.status(404).json({ message: "Template file not found" });
      }

      return res.status(200).json({ data: templateFile });
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    console.error("Error fetching template file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
