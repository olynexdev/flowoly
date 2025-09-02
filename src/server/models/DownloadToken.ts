// server/models/DownloadToken.ts
import mongoose from 'mongoose';
const DownloadTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    transactionId: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    slug: {
      type: String,
      required: true,
      ref: 'Template',
    },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export default mongoose.models.DownloadToken ||
  mongoose.model('DownloadToken', DownloadTokenSchema);
