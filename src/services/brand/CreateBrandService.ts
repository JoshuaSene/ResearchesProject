import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import Brand from './../../models/Brand';
import AppError from '../../errors/AppError';

class PostBrandService {

    public async execute( request: Request, response: Response): Promise<Response>{

        const {
            product,
            name,
          } = request.body

        const brandRepository = getRepository(Brand)
          if( !product || !name) {
            throw new AppError('fill in the fields correctly', 401)
        }

        const getProduct = await getRepository(Brand)
                .createQueryBuilder("brand")
                .where(`brand.name = '${name}'`)
                .andWhere(`brand.product = '${product}'`)
                .getOne();

            if( getProduct ) {
            throw new AppError('this item has already been registered', 401)
            }

        const brand = brandRepository.create({
            product,
            name,
        })

        const newBrand  = await brandRepository.save(brand)

        return response.json(newBrand)
    }
}
export default new PostBrandService()
