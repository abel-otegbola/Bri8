"use server"
import { IProduct } from "@/interface/store";
import { connectDB } from "@/lib/mongodb";
import Products from "@/models/products";

export const addProduct = async (values: IProduct) => {
    try {
        await connectDB();
        const product = new Products(values);
        const savedProduct = await product.save();
        console.log(savedProduct, " saved succesfully")
    }
    catch(e){
        console.log(e);
    }
}

export const updateProduct = async (values: IProduct) => {
    try {
        await connectDB();
        const product = new Products(values);
        const savedProduct = await product.update();
        console.log(savedProduct, " updated succesfully")
    }
    catch(e){
        console.log(e);
    }
}

export const getAllProducts = async () => {
    try {
        await connectDB();
        const findResult = await Products.find()
        return findResult
    }
    catch(e){
        console.log(e);
    }
}