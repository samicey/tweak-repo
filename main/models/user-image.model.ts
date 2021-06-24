import mongoose, { Schema } from 'mongoose';

const UserImageSchema = new Schema({
    id: Schema.Types.ObjectId,
    fileKey: String,
    filename: String,
    contentType: String,
    metadataKey: String,
    byteSize: String,
    userId:  Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }
  });

export const UserImage = mongoose.model('UserImage', UserImageSchema);