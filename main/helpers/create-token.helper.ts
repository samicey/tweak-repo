import { sign } from 'jsonwebtoken';
require('dotenv').config();

export const createToken = (payload: any, expires: number): string => {
    return sign(payload, String(process.env.SECRET_KEY), { expiresIn: expires });
}