export class AppError extends Error {
    public statusCode: number;
    public code: string;
    public details?: Record<string, string[]>;

    constructor(statusCode: number, code: string, message: string, details?: Record<string, string[]>) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}

export class BadRequestError extends AppError {
  constructor(code: string, message?: string, details?: Record<string, string[]>) {
    super(400, code, message || code, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(code: string = 'Unauthorized', message?: string) {
    super(401, code, message || code);
  }
}

export class ForbiddenError extends AppError {
  constructor(code: string = 'Forbidden', message?: string) {
    super(403, code, message || code);
  }
}

export class NotFoundError extends AppError {
  constructor(code: string = 'NotFound', message?: string) {
    super(404, code, message || code);
  }
}

export class ConflictError extends AppError {
  constructor(code: string, message?: string) {
    super(409, code, message || code);
  }
}