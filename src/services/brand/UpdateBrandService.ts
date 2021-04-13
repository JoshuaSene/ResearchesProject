
import { Request, Response } from 'express'
import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Brand from './../../models/Brand';


class UpdateBrandService {
    public async execute(request: Request, response: Response): Promise<Response> {

        const {
                name,
                product,
                status
            } = request.body

            const getProduct = await getRepository(Brand)
                .createQueryBuilder("brand")
                .where(`brand.name = '${name}'`)
                .andWhere(`brand.product =  '${product}'`)
                .andWhere(`brand.status =  'true'`)
                .getOne();

            if( getProduct ) {
            throw new AppError('this item has already been registered', 401)
            }


              const brandsRepository = getRepository(Brand)
              const brand: any = await brandsRepository.findOne(request.params.id);
              const mergeAcceptedOrders = brandsRepository.merge(brand, request.body);
              const results = await brandsRepository.save(mergeAcceptedOrders);
              return response.send(results);
    }
}
export default new UpdateBrandService()
