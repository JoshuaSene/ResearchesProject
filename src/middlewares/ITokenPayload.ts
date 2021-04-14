import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import {getConnection} from "typeorm";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
    tokens: string;

}

export default async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {

    let authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }
    let [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const {sub} = decoded as ITokenPayload;

        const getToken = await getConnection().query(
            `select *
                from token
                where token = '${token}'`
        )
        const date = new Date()
        const dateExp = getToken[0].expires

        if (dateExp <= date) {

            const insertExpired = await getConnection().query(
                `UPDATE token
            SET tokenStatus = "expired"
            WHERE token = '${token}'`
          )

          throw new AppError('The token is expired')
        }

        const d = new Date();
        const newDate = d.setMinutes(d.getMinutes() + 2);
        console.log(newDate)

        const getRoleId = await getConnection().query(
            `select *
            from role_users_users u
            where "usersId" = '${sub}'`
        )

//         console.log(getRoleId)
// console.log(getRoleId[0].roleId)
        const getNameRole = await getConnection().query(
            `select name
                from role
                where id = '${getRoleId[0].roleId}'`
            )
// console.log(getNameRole[0].name)


        request.user = {
            id: sub,
            role: getNameRole[0].name
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }

}

