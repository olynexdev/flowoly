import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITemplateFile extends Document {
  templateId: mongoose.Types.ObjectId; // Reference to main template
  templateSlug: string; // For easy identification
  fileUrl: string; // Stored file URL (S3, Cloudinary, etc.)
  fileName: string; // Original file name
  fileSize: number; // Size in bytes
  fileType: string; // MIME type (e.g., application/zip)
  uploadedBy: mongoose.Types.ObjectId; // User who uploaded (optional)
  uploadedAt: Date;
}

const templateFileSchema = new Schema<ITemplateFile>(
  {
    templateId: {
      type: Schema.Types.ObjectId,
      ref: 'template',
      required: true,
    },
    templateSlug: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TemplateFile: Model<ITemplateFile> =
  mongoose.models.templateFile ||
  mongoose.model<ITemplateFile>('templateFile', templateFileSchema);

export default TemplateFile;
