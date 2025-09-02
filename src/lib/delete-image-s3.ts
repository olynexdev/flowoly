import { s3 } from '@/utils/awsS3';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';

export const deleteImageFromS3 = async (
  bucketName: string,
  data: any,
  dataName: string
) => {
  try {
    const thumbnailUrl = data.thumbnail_url;
    const dataDelete = data?.[dataName] || '';

    // 1. Extract image URLs from the content using regex
    const regex = /<img[^>]+src="([^">]+)"/g;
    const imgUrls: string[] = [];
    let match;
    while ((match = regex.exec(dataDelete)) !== null) {
      imgUrls.push(match[1]);
    }

    // Add the thumbnail URL to the list of image URLs
    if (thumbnailUrl) {
      imgUrls.push(thumbnailUrl);
    }

    // 2. Extract S3 keys from URLs
    const keys = imgUrls
      .map(url => {
        try {
          const urlObj = new URL(url);
          return {
            Key: Buffer.from(
              decodeURIComponent(urlObj.pathname.substring(1))
            ).toString('utf-8'),
          };
        } catch (err) {
          console.error('Invalid S3 URL:', url, `Error: ${err}`);
          return null;
        }
      })
      .filter((key): key is { Key: string } => key !== null);

    // 3. Delete images from S3 if keys are found
    if (keys.length > 0) {
      const deleteParams = {
        Bucket: bucketName,
        Delete: { Objects: keys },
      };

      const command = new DeleteObjectsCommand(deleteParams);
      const res = await s3.send(command);
      return res;
    }

    console.log('No images found for deletion.');
    return null;
  } catch (error) {
    console.error('Error deleting images from S3:', error);
    throw new Error('Failed to delete images from S3');
  }
};
