import { TPayment } from "@/types/paymentTypes";
import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema<TPayment>({
  transactionId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  slug: { type: String, required: true },
});

const Payment =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
