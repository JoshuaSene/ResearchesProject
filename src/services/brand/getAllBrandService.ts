import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import Brand from './../../models/Brand';
import AppError from '../../errors/AppError';

class GetAllBrandService {
    public async execute(request: Request, response: Response) : Promise<Response>{
        try{
         const {
            status
          } = request.query
        const getBrand = await getRepository(Brand).find({status: `${status}`})


       return response.json(getBrand)
        } catch (e) {
            throw new AppError(e.message, 500);
        }
    }
}
export default new GetAllBrandService()
