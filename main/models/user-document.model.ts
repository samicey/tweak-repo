import { Schema } from 'mongoose';

export const UserDocument = new Schema({
    id: Schema.Types.ObjectId,
    key: String,
    filename: String,
    contentType: String,
    byteSize: String,
    userId:  Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }
  });