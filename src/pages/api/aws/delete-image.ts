// // src/pages/api/blogs/getBlog.ts
// import { handleError } from '@/server/utils/errorHandler';
// import { s3 } from '@/utils/awsS3';
// import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function getBlogHandler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return handleError(res, 405, 'Method Not Allowed');
//   }

//   try {
//     const { imageUrls } = req.body;

//     if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
//       return res
//         .status(400)
//         .json({ message: 'No image URLs provided for deletion' });
//     }

//     // Extract S3 keys from image URLs
//     const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
//     const objectsToDelete = imageUrls.map(url => {
//       const key = url.split('.com/')[1]; // Extract the S3 key from the URL
//       return { Key: key };
//     });

//     // Prepare the delete parameters for S3
//     const params = {
//       Bucket: bucketName,
//       Delete: {
//         Objects: objectsToDelete,
//         Quiet: false, // Set to true if you don't want individual errors in the response
//       },
//     };

//     const command = new DeleteObjectsCommand(params);
//     const response = await s3.send(command);
//     res.send(response);
//   } catch (err) {
//     console.log(err);
//   }
// }

import { handleError } from "@/server/utils/errorHandler";
import { s3 } from "@/utils/awsS3";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getBlogHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return handleError(res, 405, "Method Not Allowed");
  }

  try {
    const { imageUrls } = req.body;

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res
        .status(400)
        .json({ message: "No image URLs provided for deletion" });
    }

    // CloudFront base URL (replace with your CloudFront URL if needed)
    const cloudfrontBaseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;

    // Extract S3 keys from CloudFront URLs
    const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
    const objectsToDelete = imageUrls.map((url) => {
      // Remove the CloudFront domain from the URL to extract the S3 key
      const key = url.replace(cloudfrontBaseUrl + "/", ""); // Remove CloudFront domain and '/'
      return { Key: key };
    });

    // Prepare the delete parameters for S3
    const params = {
      Bucket: bucketName,
      Delete: {
        Objects: objectsToDelete,
        Quiet: false, // Set to true if you don't want individual errors in the response
      },
    };

    const command = new DeleteObjectsCommand(params);
    const response = await s3.send(command);
    res.send(response);
  } catch (err) {
    console.log(err);
    return handleError(res, 500, "Internal Server Error");
  }
}
