import { CustomError } from './CustomError';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateMiddleware(type: any): (req: Request, res: Response, next: NextFunction) => void {
    return async (req, res, next) => {
        const validationObj = plainToClass(type, req.body);
        const errors = await validate(validationObj);
        if (errors.length > 0) {
            const constraints = []
            errors.forEach((err: any) => {
                constraints.push(err.constraints[Object.keys(err.constraints)[0]])
            })
            next(new CustomError(`${constraints}`, 400));
        } else {
            req.body = validationObj;
            next();
        }
    };
}