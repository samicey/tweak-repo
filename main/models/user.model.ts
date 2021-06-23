import { Schema } from 'mongoose';

export const User = new Schema({
    id: Schema.Types.ObjectId,
    email: String,
    name: String,
    password: String,
    createdAt: { type: Date, default: Date.now }
  });