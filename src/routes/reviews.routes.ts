import { Router } from "express";
import CreateReviewService from "../services/Review/CreateReviewService";
import GetReviewService from "../services/Review/GetReviewService";

const reviewRouter = Router()

reviewRouter.post('/',  CreateReviewService.execute)
reviewRouter.get('/:status',  GetReviewService.execute)
// brandsRouter.put('/',  UpdateBrandService.execute)

export default reviewRouter
