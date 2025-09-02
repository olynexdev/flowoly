// src/pages/api/template-files/generate-token.ts
import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import connectToDatabase from "@/server/config/mongoose";
import DownloadToken from "@/server/models/DownloadToken";
import Payment from "@/server/models/Payment";
import AuthUser from "@/server/models/User";

type SessionUserPayload = {
  transactionId?: string;
  slug?: string;
  type?: string; // 'admin-request' | 'purchase' | ...
  email?: string;
  fakeId?: string;
  userEmail?: string;
};

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
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!SECRET_KEY) {
    console.error("SECRET_KEY / JWT_SECRET not configured in environment");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  await connectToDatabase();

  try {
    const encryptedToken: string | undefined =
      (req.cookies && (req.cookies as any).accessToken) ||
      parseCookieHeader(req.headers.cookie, "accessToken");

    if (!encryptedToken) {
      return res
        .status(400)
        .json({ message: "Token (accessToken cookie) is required" });
    }

    // Decrypt safely
    let decryptedData: SessionUserPayload | null = null;
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
      const text = bytes.toString(CryptoJS.enc.Utf8);
      if (!text) throw new Error("Empty decrypted text (invalid key or token)");
      decryptedData = JSON.parse(text) as SessionUserPayload;
    } catch (err) {
      console.error("Decryption/parse error:", err);
      return res.status(400).json({ message: "Invalid or corrupted token" });
    }

    const { transactionId, slug, type, email } = decryptedData || {};
    if (!slug) {
      return res
        .status(400)
        .json({ message: "Missing slug in decrypted token" });
    }

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Common options to return the upserted/updated document
    const findOneAndUpdateOptions = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };

    // Admin request flow
    if (type === "admin-request") {
      if (!email)
        return res
          .status(400)
          .json({ message: "Admin email missing in token" });

      const findAdmin = (await AuthUser.findOne({ email }).lean()) as {
        email: string;
        role?: string;
      } | null;
      if (!findAdmin || findAdmin.role !== "admin") {
        return res
          .status(403)
          .json({ message: "You are not authorized as admin" });
      }

      const doc = await DownloadToken.findOneAndUpdate(
        { email },
        {
          $set: {
            token: encryptedToken,
            email,
            role: "admin",
            slug,
            expiresAt,
            used: false,
          },
        },
        findOneAndUpdateOptions
      ).exec();

      if (!doc) {
        console.error(
          "Failed to create or fetch DownloadToken for admin-request"
        );
        return res.status(500).json({ message: "Failed to create token" });
      }

      return res
        .status(200)
        .json({ token: (doc as any).token, expiresAt: (doc as any).expiresAt });
    }

    // Purchase flow
    if (transactionId) {
      if (!email)
        return res
          .status(400)
          .json({ message: "Payer email missing in token" });

      const payment = (await Payment.findOne({
        transactionId,
        status: "completed", // adapt statuses to your Payment schema
        email,
        slug,
      }).lean()) as { email: string } | null;

      if (!payment) {
        return res
          .status(402)
          .json({ message: "Payment not found or incomplete" });
      }

      const doc = await DownloadToken.findOneAndUpdate(
        { email }, // you might want to use { email, slug } to avoid colliding tokens across slugs
        {
          $set: {
            token: encryptedToken,
            email: payment.email,
            transactionId,
            role: "user",
            slug,
            expiresAt,
            used: false,
          },
        },
        findOneAndUpdateOptions
      ).exec();

      if (!doc) {
        console.error(
          "Failed to create or fetch DownloadToken for purchase flow"
        );
        return res.status(500).json({ message: "Failed to create token" });
      }

      return res
        .status(200)
        .json({ token: (doc as any).token, expiresAt: (doc as any).expiresAt });
    }

    return res.status(400).json({
      message: "Invalid request parameters (no admin nor transactionId)",
    });
  } catch (error) {
    console.error("Token generation error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
