import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import { getConnection } from 'typeorm'
import AppError from '../../errors/AppError'
import User from '../../models/User'

interface IRequest {
    id: string;
    name: string;
    email: string;
    document: string;
    password: string;
    contact_phone: string;
    status: string;
}

export default class CreateUserService {

    public async execute({ id, name, email, document, password, contact_phone, status }: IRequest): Promise<User> {
        try{
        const usersRepository = getRepository(User)
        const checkUserExists = await usersRepository.findOne({
            where: { email }
        })

        if (checkUserExists) {
            throw new AppError('Email address already used', 401)
        }

        const checkDocumentExists = await usersRepository.findOne({
            where: { document }
        })

        if (checkDocumentExists) {
            throw new AppError('Document number already used')
        }

        const hashedPassword = await hash(password, 8)
        const user = usersRepository.create({
            id,
            name,
            email,
            document,
            password: hashedPassword,
            contact_phone,
            status: true
        })
        var usr = await usersRepository.save(user)


        const selectRole = await getConnection().query(
            `SELECT *
            FROM role r
            WHERE name = 'client'`
            )
            // console.log(selectRole)
            const insertRole = await getConnection().query(
                `INSERT INTO role_users_users
                ("roleId", "usersId") values ('${selectRole[0].id}', '${usr.id}')`
                )

        return usr
        } catch (e) {
            throw new AppError(e.message, 500);
        }
    }
}
