import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import Brand from './../../models/Brand';
import AppError from '../../errors/AppError';
import Review from '../../models/review';

class CreateReviewService {

    public async execute( request: Request, response: Response): Promise<Response>{
        try{
        const {
            evaluationNote,
            comment,
            brandId,
            userId
        } = request.body

        if (evaluationNote>10) {
            throw new AppError('insert a note between 0 and 10', 401);
        }


        const reviewRepository = getRepository(Review)
          if( !evaluationNote || !comment) {
            throw new AppError('fill in the fields correctly', 401)
        }

        const review = reviewRepository.create({
            evaluationNote,
            comment,
            brandId,
            userId
        })

        const newReview  = await reviewRepository.save(review)

        return response.json(newReview)

        } catch (e) {
            throw new AppError(e.message, 500);
        }
    }
}
export default new CreateReviewService()
