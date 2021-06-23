import { NextFunction, Request, Response } from 'express';

import { CustomError } from './custom-error-setter';

const MESSAGES_TRACE_AS_WARNING = ['jwt expired'];

export function traceError(error: any, origin: string): void {
  const isWarningError =
    error &&
    ((error.message && MESSAGES_TRACE_AS_WARNING.includes(error.message)) ||
      (error.customError && MESSAGES_TRACE_AS_WARNING.includes(error.customError)));

  if (!isWarningError) {
    console.error('Error Trace - errorHandler - Unexpected Error', error);
  } else {
    console.warn(`Warning Trace - ${origin}`, error);
  }
}

export function handleError(error: CustomError, request: Request, response: Response, next: NextFunction): Response {
  traceError(error, 'errorHandler');

  if (response.headersSent) {
    next(error);

    return response;
  }

  if (error && error.status) {
    return response.status(error.status).json({ error: error.customError || error.message });
  }

  return response.status(500).json({ message: 'Internal server error' });
}

export const promiseRejectionHandler = (apiFunction: any) => (
  request: Request,
  response: Response,
  next: NextFunction
): void =>
  apiFunction(request, response, next).catch((error: any) => {
    traceError(error, 'errorHandler');

    next(error);
  });
