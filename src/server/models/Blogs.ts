import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Blog interface
export interface IBlog extends Document {
  title: string;
  category: string;
  blog_data: string;
  read_time: string;
  thumbnail_url: string;
  keywords: string[];
  meta_description: string;
  meta_title: string;
  customURL: string;
  createdAt: string;
}

// Define the schema
const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    blog_data: { type: String, required: true },
    read_time: { type: String, required: true },
    thumbnail_url: { type: String, required: true },
    keywords: { type: [String], required: true },
    meta_description: { type: String, required: true },
    meta_title: { type: String, required: true },
    customURL: { type: String, required: true },
  },
  { timestamps: true }
);

// Check if the model is already compiled
const Blog: Model<IBlog> =
  mongoose.models.blog || mongoose.model<IBlog>("blog", blogSchema);

export default Blog;
