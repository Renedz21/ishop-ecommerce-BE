import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { createError } from './createError.js';

export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;

    if (!token) return next(createError('Usted no estas autenticado!', 401));

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) return next(createError('El token no es válido', 401));
        req.user = decoded;
        next();
    });

}
