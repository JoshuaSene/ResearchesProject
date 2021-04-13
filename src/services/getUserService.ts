import { getConnection } from 'typeorm'
import { Request, Response } from 'express'
import AppError from "../errors/AppError";

class GetUserService {
    public async execute(request: Request, response: Response) : Promise<Response>{
        const role = request.query.role

        if (!role){
            const users = await getConnection().query(
            `
            select *
            from users u
            where u.status = true
            `
            )
            return response.json(users)
        }

        const users = await getConnection().query(
            `
            select u."name", u."document" , u."email", u."contact_phone", u."id", u."status",  rl."name" as roleName
            from users u
            inner join  role_users_users ruu
            ON  ruu."usersId" = u.id
            inner join "role" rl
            on rl.id = ruu."roleId"
            where rl."name" = '${role}'
            and status = true
            `
            )


       return response.json(users)
    }
}
export default new GetUserService()
