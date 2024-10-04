import httpStatus from 'http-status';
import ApiError from '../utils/api_error';
import { NextFunction, Request, Response } from 'express';
import pick from '../utils/pick';
import Joi from 'joi';

const validate = (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const obj = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key'}, abortEarly: false })
        .validate(obj);
    if (error) {
        const errorMessage = error.details.map((detail)=> detail.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(obj, value);
    return next()
};

export default validate;