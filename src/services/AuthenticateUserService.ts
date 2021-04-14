import {getConnection, getRepository} from 'typeorm'
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
import authConfig from '../config/auth'
import AppError from '../errors/AppError'
import User from '../models/User'
import Token from '../models/Token'

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: User;
    token: string;
    tokenId: string;
    tokenStatus: string;
    UserId: string;
    expiresIn: any;
    role: string;
}

export default class AuthenticateUserService {
    public async execute({email, password}: IRequest): Promise<IResponse> {
        try{

        const usersRepository = getRepository(User);
        const tokenRepository = getRepository(Token);

        const user = await usersRepository.findOne({
            where: {email}
        })

        if (!user) {
            throw new AppError('Incorrect email/password combinations', 401)
        }

        const passwordMatched = await compare(password, user.password)

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401)
        }

        const verifyStatus = await getConnection().query(
            `select *
            from users u
            where id = '${user.id}' `
            )

        if (verifyStatus.length < 1) {
            throw new AppError('user not allowed', 401)
        }
        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        var d = new Date();
        d.setMinutes(d.getMinutes() + 20);

        const newToken =  tokenRepository.create({
            token,
            tokenStatus: 'Active',
            userId: user,
            expires: d
        })

        const getRoleId = await getConnection().query(
            `select *
            from role_users_users u
            where "usersId" = '${user.id}'`
        )

        const getNameRole = await getConnection().query(
            `select name
                from role
                where id = '${getRoleId[0].roleId}'`
            )

        await tokenRepository.save(newToken)

        return {
            user,
            expiresIn,
            UserId: user.id,
            tokenId: '',
            tokenStatus: '',
            role: getNameRole[0].name,
            token
        };
        } catch (e) {
            throw new AppError(e.message, 500);
        }
    }
}
