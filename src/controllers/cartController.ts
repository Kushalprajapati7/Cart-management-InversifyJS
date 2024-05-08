import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CartService } from "../services/cartServices";
import { Err_CODES, Err_MESSAGES } from "../config/error";
import { controller, httpDelete, httpPost, httpPut } from "inversify-express-utils";
import { ProductModel } from "../models/ProductModel";
import verifyToken from '../middleware/authMiddleware'
import CustomRequest from "../types/customRequest";


@controller("/cart")
export class CartController {
    constructor(
        @inject("CartService") private CartService: CartService,
        
    ) { }

    @httpPost("/",verifyToken)
    async createCart(req: CustomRequest, res: Response): Promise<void> {
        try {
            // console.log("Inside Cart Post");
            const { profileId, items } = req.body;
            const userId = req.userId;
            // console.log(userId);

            let total = 0;

            if (!userId) {
                res.status(Err_CODES.SESSIONEXPIRED).send(Err_MESSAGES.SESSIONEXPIRED + " Login again ")
                console.log("User ID is missing.");
            }
            for (const item of items) {
                const product = await ProductModel.findById(item.productId);
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }

                total += product.price * item.quantity;

                item.name = product.name;
                item.description = product.description;
                item.price = product.price;
            }
            const newCart = await this.CartService.createCart(userId, profileId, items, total);
            res.status(Err_CODES.SUCCESSED).json(newCart);
        }
        catch (error) {
            console.error("Error creating Cart:", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    @httpPut('/:id',verifyToken)
    async updateCart(req: CustomRequest, res: Response): Promise<void> {

        try {
            const userID = req.userId;
            if (!userID) {
                throw new Error("User ID is missing.");
            }
            const id = req.params.id;
            const { profileId, items } = req.body;
            let total = 0;

            for (const item of items) {
                const product = await ProductModel.findById(item.productId);
                if (!product) {
                    res.status(Err_CODES.NOT_FOUND).json({ message: `Product with ID ${item.productId} not found` });
                    return;
                }
                total += product.price * item.quantity;
                item.name = product.name;
                item.description = product.description;
                item.price = product.price;
            }

            const updatedCart = await this.CartService.updateCart(id, profileId, items, total);
            res.status(Err_CODES.SUCCESSED).json(updatedCart);
        }
        catch (error) {
            console.error("Error Updating Cart:", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    @httpDelete('/:id',verifyToken)
    async deleteCart(req: CustomRequest, res: Response): Promise<void> {
        try {
            const userId = req.userId;
            if(!userId){
                console.log("Session in Expired");
                // res.status(Err_CODES.SESSIONEXPIRED).send(Err_MESSAGES.SESSIONEXPIRED)
            }
            const { id } = req.params;
            const deleteCart: any = await this.CartService.deleteCart(id);
            if (!deleteCart) {
                res.status(Err_CODES.SUCCESSED).send(Err_MESSAGES.SUCCESSED)
            } else {
                res.status(Err_CODES.NOT_FOUND).send(Err_MESSAGES.NOT_FOUND)

            }
        }
        catch (error) {
            console.log("Error While Deleteing the cart", error);
            res.status(Err_CODES.INTERNAL_SERVER_ERROR).send(Err_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }
   
}