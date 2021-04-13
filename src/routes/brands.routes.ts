import { Router } from "express";
import CreateBrandService from "../services/brand/CreateBrandService";
import GetAllBrandService from "../services/brand/getAllBrandService";
import UpdateBrandService from "../services/brand/UpdateBrandService";

const brandsRouter = Router()

brandsRouter.post('/',  CreateBrandService.execute)
brandsRouter.get('/:status',  GetAllBrandService.execute)
brandsRouter.put('/',  UpdateBrandService.execute)

export default brandsRouter
