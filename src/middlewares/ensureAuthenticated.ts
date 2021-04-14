import { Request, Response, NextFunction } from 'express';

// @ts-ignore
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
    getNameRole: string
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    // console.log(authHeader)
    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub, getNameRole } = decoded as ITokenPayload;


        request.user = {
            id: sub,
            role: getNameRole[0]
        };
// console.log('REQUESTs USER ID',request.user.id)
        return next();
    } catch {
        throw new AppError('The token has been expired', 401);
    }
}
