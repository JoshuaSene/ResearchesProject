import { Request, Response } from 'express';
import Role from '../models/Role';
import AuthenticateUserService from '../services/AuthenticateUserService'

export default class AuthenticateUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUser = new AuthenticateUserService()

        const { user, token, role } = await authenticateUser.execute({
            email,
            password
        })

        const authReturn = {
            id: user.id,
            name: user.name,
            email: user.email,
            document: user.document,
            contactPhone: user.contact_phone,
            token: token,
            role
        }

        return response.json( authReturn );

    }
}
