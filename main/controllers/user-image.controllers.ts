import { Request, Response } from 'express';
import { readMetadata } from 'imagemagick';
import { v4 as uuid } from 'uuid';
import { responseHandlers } from "../helpers/response-handlers.helpers";
import { RETURN_CODE } from "../helpers";
import { uploadFileToRepository, uploadMetaDataToRepository } from '../helpers/bucket-aws';
import { UserImage } from '../models/user-image.model';

export const uploadImage = async (request: Request, response: Response) => {
    try {
        const [file] = request.files as Express.Multer.File[];
        const { user } = response.locals;
        const metadataKey = uuid();
        const fileKey = uuid();
        readMetadata(file.path, async (error, result) => {
            await uploadMetaDataToRepository(JSON.stringify({exif: result.exif, iptc: result.iptc}), metadataKey);
        });

      
        await uploadFileToRepository(file, fileKey);

        const image = await UserImage.create({
            fileKey,
            filename: file.filename,
            contentType: file.mimetype,
            metadataKey,
            byteSize: String(file.size),
            userId:  user._id,
        });

        return responseHandlers(response, RETURN_CODE.OK, image); 
    } catch (error) {
        console.log(error)
     return responseHandlers(response, RETURN_CODE.InternalServerError, error)
    }
};

export const listImages =  async (request: Request, response: Response) => {

    try {
    const images = await UserImage.find({});

    return responseHandlers(response, RETURN_CODE.OK, images);
    } catch (error) {
    return responseHandlers(response, RETURN_CODE.InternalServerError, error)
    }
};