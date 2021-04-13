import { Router } from "express";
import GetUserService from "../services/getUserService";

const usersCrudRouter = Router()

usersCrudRouter.get('/:role',  GetUserService.execute)

export default usersCrudRouter
