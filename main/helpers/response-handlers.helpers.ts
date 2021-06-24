import { ReturnType } from './custom-error-setter';
import { Response } from 'express';

export const responseHandlers = (response:Response, returnType: ReturnType, data: any): Response => {
    const { code, message } = returnType;
    return response.status(code).json({message, data})
}