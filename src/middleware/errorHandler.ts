import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors.js";

export const globalErrorHandler = (error: Error | AppError, req: Request, res: Response, next: NextFunction) =>{
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const status = statusCode >= 500 ? "error" : "fail";

    res.status(statusCode).json({
        status,
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        details: error instanceof AppError ? error.details : undefined,
    });
}