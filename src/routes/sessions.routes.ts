import { Router } from 'express'

import AuthenticateUserController from '../controllers/AuthenticateUserController'


const sessionsRouter = Router()
const authenticateUser = new AuthenticateUserController()

sessionsRouter.post('/', authenticateUser.handle)


export default sessionsRouter
