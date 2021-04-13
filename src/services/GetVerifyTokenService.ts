import { getConnection } from 'typeorm'
import { Request, Response } from 'express'
import AppError from "../errors/AppError";

class GetUserService {
    public async execute(request: Request, response: Response) : Promise<Response>{
        const user = request.params.id
        const user_id = request.user.id
        console.log(user)
        console.log(user_id )
        if( user !== user_id) {
            return response.status(404).json({error:'User not allowed'})
        }
        const users = await getConnection().query(
            `select *
            from bd_trade.users u
            where id = '${user}'
            and status != 'NEW'`
        )


        return response.json(users[0])
    }
}
export default new GetUserService()
