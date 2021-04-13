import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import Brand from './../../models/Brand';

class GetAllBrandService {
    public async execute(request: Request, response: Response) : Promise<Response>{
         const {
            status
          } = request.query
        const getBrand = await getRepository(Brand).find({status: `${status}`})


       return response.json(getBrand)
    }
}
export default new GetAllBrandService()
