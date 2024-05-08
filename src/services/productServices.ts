import { injectable } from "inversify";
import { ProductModel } from "../models/ProductModel";
import "reflect-metadata";

@injectable()
export class ProductService {

    async getAllProducts(): Promise<any[]> {
        console.log("Hey ");
        const products = await ProductModel.find({});
        return products;
    }

    async createProduct(name:string, description:string,price:number, stock:number): Promise<any>{
        const newProduct = await ProductModel.create({name,description,price,stock});
        return newProduct; 
        
    }
}
