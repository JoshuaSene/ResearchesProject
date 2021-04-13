import { Router } from 'express'
import ensureAuthenticated from "../middlewares/ITokenPayload"

import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'
import verifyTokenRouter from './verifyToken.routes'
import usersCrudRouter from './usersCrud.routes'
import brandsRouter from './brands.routes'
import reviewRouter from './reviews.routes'

const routes = Router()

routes.use('/v0/account', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use(ensureAuthenticated)
routes.use('/v0/user', usersCrudRouter)
routes.use('/v0/brand', brandsRouter)
routes.use('/v0/review', reviewRouter)
routes.use('/v0/verifyToken', verifyTokenRouter)

export default routes

