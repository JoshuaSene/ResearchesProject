import {Request, Response} from 'express';
import {classToClass} from 'class-transformer'
import CreateUserService from '../services/UserAccount/CreateUserService';

export default class CreateUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const {id, name, email, document, password, contact_phone, status} = request.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({
            id, name, email, document, password, contact_phone, status
        })

           const authReturn = {
            id: user.id,
            name: user.name,
            email: user.email,
            document: user.document,
            contactPhone: user.contact_phone,
            role: 'CLIENT'
        }
        console.log(authReturn)

        return response.json(classToClass(authReturn));
    }
}
