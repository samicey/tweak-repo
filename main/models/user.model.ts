import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: String,
    name: String,
    password: String,
    createdAt: { type: Date, default: Date.now }
  });

  export const User = mongoose.model('User', UserSchema);

