import connectToDatabase from "@/server/config/mongoose";
import Payment from "@/server/models/Payment";
import { sendAdminPaymentMessage } from "@/server/services/sendAdminPaymentMessage";
import { sendPaymentMessage } from "@/server/services/sendPaymentMessage";
import { handleError } from "@/server/utils/errorHandler";
import { NextApiRequest, NextApiResponse } from "next";

export default async function savePayment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return handleError(res, 405, "Method Not Allowed");
  }

  await connectToDatabase();

  try {
    const {
      transactionId,
      email,
      name,
      amount,
      currency,
      status,
      slug,
      template,
    } = req.body;

    // Check if this transaction ID already exists
    const existingPayment = await Payment.findOne({ transactionId });

    if (existingPayment) {
      return res
        .status(409)
        .json({ message: "Payment already exists", payment: existingPayment });
    }

    // Save new payment
    const payment = await Payment.create({
      transactionId,
      email,
      name,
      amount,
      currency,
      status,
      slug,
    });

    // Send email if payment completed
    if (status === "complete") {
      sendPaymentMessage({
        transactionId,
        email,
        name,
        amount,
        currency,
        status,
        slug,
        template,
      });
    }

    sendAdminPaymentMessage({
      transactionId,
      email,
      name,
      amount,
      currency,
      status,
      slug,
      template,
    });

    res.status(200).json({ message: "Payment saved successfully", payment });
  } catch (error) {
    console.error(error);
    handleError(res, 500, "Server error: Unable to save payment");
  }
}
