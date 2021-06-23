import { traceError } from './handle-error';

export const RETURN_CODE = {
  BadRequest: { code: 400, message: 'Bad Request' },
  Conflict: { code: 409, message: 'Conflict' },
  Forbidden: { code: 403, message: 'Forbidden' },
  InternalServerError: { code: 500, message: 'Internal Server Error' },
  NotFound: { code: 404, message: 'Not Found' },
  OK: { code: 200, message: 'OK' },
  Unauthorized: { code: 401, message: 'Unauthorized' },
};

export interface ReturnType {
  code: number;
  message: string;
}

export class CustomError extends Error {
  private returnType: ReturnType;

  private customErrorMessage?: string;

  constructor(returnType: ReturnType, error?: string) {
    super(error || returnType.message);

    this.customErrorMessage = error;
    this.returnType = {
      ...returnType,
      message: error || returnType.message,
    };

    if (typeof jest === 'undefined') {
      traceError(error, 'errorHandler');
    }
  }

  public get customError(): string | undefined {
    return this.customErrorMessage;
  }

  public get returnCode(): number {
    return this.returnType.code;
  }

  public get status(): number {
    return this.returnType.code;
  }
}
