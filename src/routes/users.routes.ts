import { Router } from 'express'

import CreateUserController from '../controllers/CreateUserController'

const usersRouter = Router()
const createUser = new CreateUserController()

usersRouter.post('/', createUser.handle)

export default usersRouter
