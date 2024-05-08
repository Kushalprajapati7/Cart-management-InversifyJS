import { inject,injectable } from "inversify";
import "reflect-metadata"
import { CartModel } from "../models/CartModel";

@injectable()
export class CartService{
    async createCart(userId:string,profileId:string, items:[], total:number, ):Promise<any>{
       const cart=  await CartModel.create({userId, profileId,items,total});
       return cart;
    }

    async updateCart(id: string, profileId: string, items:[], total: number): Promise<any> {
        const updatedCart = await CartModel.findByIdAndUpdate(id, { profileId, items, total }, { new: true });
        return updatedCart;
    }
    
    async deleteCart(id:string):Promise<void>{
        await CartModel.findByIdAndDelete(id);
    }

    async deleteCartByProfileId(profileId: string): Promise<void> {
        await CartModel.deleteMany({profileId});
    }
}
