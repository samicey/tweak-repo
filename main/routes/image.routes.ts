import { Router } from 'express';
import { processUploadFile, checkToken } from '../middlewares';
import { listImages, uploadImage } from '../controllers/user-image.controllers';

export const imageRoute = Router();

imageRoute.post('/', checkToken, processUploadFile, uploadImage)
          .get('/', listImages)