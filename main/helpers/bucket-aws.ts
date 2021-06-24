import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';
import { CustomError, RETURN_CODE } from './custom-error-setter';

export const uploadFileToRepository = (
  file: Express.Multer.File,
  key: string
): Promise<S3.ManagedUpload.SendData | undefined> => {
  const bucketManager = getBucketManager();
  const bucketName = process.env.AWS_BUCKET_NAME;
  const imageBody = fs.readFileSync(`${file.path}`);

  if (bucketName && imageBody) {
    const parameters = {
      Body: imageBody,
      Bucket: bucketName,
      ContentType: file.mimetype,
      Key: key,
    };

    return bucketManager.upload(parameters).promise();
  }
  throw new CustomError(RETURN_CODE.InternalServerError);
};

export const uploadMetaDataToRepository = (
  metadata: any,
  key: string,
): Promise<S3.ManagedUpload.SendData | undefined> => {
  const bucketManager = getBucketManager();
  const bucketName = process.env.AWS_BUCKET_NAME;

  if (bucketName) {
    const parameters = {
      Body: metadata,
      Bucket: bucketName,
      Key: key,
    };

    return bucketManager.upload(parameters).promise();
  }
  throw new CustomError(RETURN_CODE.InternalServerError);
};

const getBucketManager = () => {
  const awsRegion = process.env.AWS_BUCKET_REGION;
  const awsAccessKeyId = process.env.AWS_BUCKET_ACCESS_KEY_ID;
  const awsSecretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY;
  const bucketManager = new S3({
    accessKeyId: awsAccessKeyId,
    region: awsRegion,
    secretAccessKey: awsSecretAccessKey,
  });

  return bucketManager;
};
