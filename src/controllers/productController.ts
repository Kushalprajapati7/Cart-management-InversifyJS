// controllers/userController.ts
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { ProductService } from "../services/productServices";
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import { Err_CODES, Err_MESSAGES } from "../config/error";
import verifyToken from '../middleware/authMiddleware'
import CustomRequest from "../types/customRequest";


// @injectable()
@controller("/Product", verifyToken)
export class ProductController {
    constructor(@inject('ProductService') private ProductService: ProductService) { }

    @httpGet("/")
    async getAllProducts(req: CustomRequest, res: Response): Promise<void> {
        try {
            const userId = req.userId;
            if (!userId) {
                res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
                return;
            }
            const product = await this.ProductService.getAllProducts();
            res.status(Err_CODES.SUCCESSED).json(product);
        }
        catch (error) {
            console.log("Error while retriving Products", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR);

        }
    }

    @httpPost('/',verifyToken)
    async createProduct(req: CustomRequest, res: Response): Promise<void> {
        try{
            const userId = req.userId;
            if (!userId) {
                res.status(Err_CODES.SESSIONEXPIRED).send(Err_CODES.SESSIONEXPIRED);
                return;
            }
            const {name, description, price, stock} = req.body;
            console.log(req.body);
            const newProduct = await this.ProductService.createProduct(name,description, price, stock);
            res.status(Err_CODES.SUCCESSED).json(newProduct);
            
        }
        catch(error){
            console.log("Error while Adding Products", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR);

        }           
    }
}
