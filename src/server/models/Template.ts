import mongoose, { Schema, Document, Model } from "mongoose";

export type PurchaseSource =
  | "webflow"
  | "framer"
  | "wix"
  | "wordpress"
  | "our-site";
export type TemplateType =
  | "webflow-template"
  | "framer-template"
  | "wix-template"
  | "wordpress-template";

export interface ITemplateMetaData {
  framework?: string;
  compatibility?: string;
  layout?: string;
  license?: string;
  features?: string[];
}

export interface ITemplate extends Document {
  template_type: TemplateType;
  title: string;
  template_data: string; // HTML or serialized content
  keywords: string[];
  thumbnail_url?: string;
  category: string;
  meta_description?: string;
  meta_title?: string;
  customURL: string;
  short_description?: string;
  price: number;
  live_demo_url?: string;
  template_images: string[]; // array of S3 URLs
  template_meta_data: ITemplateMetaData;
  purchase_source: PurchaseSource;
  purchase_url?: string; // required if purchase_source != 'our-site'
  template_file_id?: mongoose.Types.ObjectId | string; // reference to TemplateFile collection (if hosted on our site)
  template_file_url?: string; // fallback URL to ZIP in S3
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TemplateMetaDataSchema = new Schema<ITemplateMetaData>(
  {
    framework: { type: String },
    compatibility: { type: String },
    layout: { type: String },
    license: { type: String },
    features: { type: [String], default: [] },
  },
  { _id: false }
);

const templateSchema = new Schema<ITemplate>(
  {
    template_type: {
      type: String,
      enum: [
        "webflow-template",
        "framer-template",
        "wix-template",
        "wordpress-template",
      ],
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    template_data: { type: String, required: true }, // HTML / editor data
    keywords: { type: [String], required: true, default: [] },
    thumbnail_url: { type: String },
    category: { type: String, required: true },
    meta_description: { type: String },
    meta_title: { type: String },
    customURL: { type: String, required: true, unique: true, trim: true },
    short_description: { type: String },
    price: { type: Number, required: true, default: 0 },
    live_demo_url: { type: String },
    template_images: { type: [String], default: [] },
    template_meta_data: { type: TemplateMetaDataSchema, default: {} },
    // Purchase info
    purchase_source: {
      type: String,
      enum: ["webflow", "framer", "wix", "wordpress", "our-site"],
      required: true,
    },
    purchase_url: { type: String }, // use when purchase_source !== 'our-site'
  },
  { timestamps: true }
);

// Model compilation (prevents recompilation in serverless environments)
const Template: Model<ITemplate> =
  (mongoose.models.Template as Model<ITemplate>) ||
  mongoose.model<ITemplate>("Template", templateSchema);

export default Template;
