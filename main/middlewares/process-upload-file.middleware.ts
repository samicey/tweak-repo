import { Request } from 'express';
import multer, { FileFilterCallback, memoryStorage } from 'multer';

import { CustomError, RETURN_CODE } from '../helpers/custom-error-setter';

const INVALID_FILE_TYPE_ERROR = 'file type not accepted';
const REGEX_ACCEPTABLE_FILE_EXTENSIONS = /\.(jpg|jpeg|png|pdf|docx|doc|csv|xlsx|xls)$/i;

const storage = memoryStorage();

const documentFilter = (_: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (!file.originalname.match(REGEX_ACCEPTABLE_FILE_EXTENSIONS)) {
    callback(new CustomError(RETURN_CODE.BadRequest, INVALID_FILE_TYPE_ERROR));
  } else {
    callback(null, true);
  }
};

export const processUploadFile = multer({ fileFilter: documentFilter, storage }).any();
