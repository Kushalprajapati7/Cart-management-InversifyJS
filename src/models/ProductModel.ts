import mongoose  from "mongoose";

export interface IProduct{
    name:string,
    description:string,
    price:number,
    stock:number,
}

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter product name"]
    },
    description:{
        type:String,
        required: [true,"Please enter product description"]
    },
    price:{
        type:Number,
        required:[true,"please enter price"]
    },
    stock:{
        type:Number,
        required:[true,"please enter Stick"]
    }  
},{
    timestamps: true,
})

export const ProductModel = mongoose.model<IProduct>('Product',productSchema);