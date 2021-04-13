import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import Review from './../../models/review';
import Brand from './../../models/Brand';

class GetReviewService {
    public async execute(request: Request, response: Response) : Promise<Response>{
        const params = request.query

        const getBrand = await getRepository(Brand)
        .find({status: `${request.query.status}`, product: `${request.query.product}`, name: `${request.query.name}` })

        const getReview = await getRepository(Review)
            .createQueryBuilder("review")
            .where(`review.brandId ='${getBrand[0].id}'`)
            .getMany();

       let media = getReview.reduce((soma, nota) => soma += nota.evaluationNote, 0) / getReview.length;

       return response.json({Notes:`${media}`, getReview: getReview})
    }
}
export default new GetReviewService()
