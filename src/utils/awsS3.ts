import { S3Client } from "@aws-sdk/client-s3";

// Configure AWS SDK
export const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
