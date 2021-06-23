import S3, { DeleteObjectOutput } from 'aws-sdk/clients/s3';
import fs from 'fs';
import { CustomError, RETURN_CODE } from './custom-error-setter';

const DELETE_ERROR_MESSAGE = '';
const UPLOAD_ERROR_MESSAGE = '';

export const deleteFileFromRepository = (key: string): Promise<DeleteObjectOutput> => {
  const bucketManager = getBucketManager();
  const bucketName = process.env.AWS_BUCKET_NAME;

  if (bucketName) {
    const parameters = {
      Bucket: bucketName,
      Key: key,
    };

    return bucketManager
      .deleteObject(parameters, (error, data) => {
        if (error) {
          throw new CustomError(
            { code: error.statusCode || RETURN_CODE.InternalServerError.code, message: error.message },
            DELETE_ERROR_MESSAGE
          );
        } else {
          return data;
        }
      })
      .promise();
  }
  throw new CustomError(RETURN_CODE.InternalServerError, DELETE_ERROR_MESSAGE);
};

export const getPrivateAwsUrl = (key: string): string => {
  const bucketManager = getBucketManager();
  const parameters = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Expires: Number(process.env.BUCKET_EXPIRATION_TIME),
    Key: key,
  };

  return bucketManager.getSignedUrl('getObject', parameters);
};

export const getPublicAwsUrl = (key: string): string => {
  const bucketName = process.env.AWS_BUCKET_NAME;

  if (bucketName) {
    const bucketManager = getBucketManager();
    const parameters = { Bucket: bucketName, Key: key };

    return bucketManager.getSignedUrl('getObject', parameters);
  }
  return key;
};

export const uploadFileToRepository = (
  file: Express.Multer.File,
  key: string
): Promise<S3.ManagedUpload.SendData | undefined> => {
  const bucketManager = getBucketManager();
  const bucketName = process.env.AWS_BUCKET_NAME;
  const documentBody = fs.readFileSync(`${file.path}`);

  if (bucketName && documentBody) {
    const parameters = {
      Body: documentBody,
      Bucket: bucketName,
      ContentType: file.mimetype,
      Key: key,
    };

    return bucketManager.upload(parameters).promise();
  }
  throw new CustomError(RETURN_CODE.InternalServerError, UPLOAD_ERROR_MESSAGE);
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
