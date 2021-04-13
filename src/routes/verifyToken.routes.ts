import { Router } from "express";
import GetVerifyTokenService from "../services/GetVerifyTokenService";

const verifyTokenRouter = Router()

verifyTokenRouter.get('/',  GetVerifyTokenService.execute)

export default verifyTokenRouter
