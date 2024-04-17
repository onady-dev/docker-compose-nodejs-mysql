import { Request, Response, NextFunction } from 'express';
import { CustomError } from './CustomError';

export function errorMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction): void {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({
        success: false,
        status,
        message
    });
}