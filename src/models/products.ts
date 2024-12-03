import { IProduct } from "@/interface/store";
import mongoose, { model, Schema } from "mongoose";

const ProductsSchema = new Schema<IProduct>({
    title: {
      type: String,
      unique: true,
      required: [true, "Title is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"]
    },
    description: {
      type: String,
      required: [true, "Description is required"]
    },
    tags: {
      type: [String],
      required: [false, "tags are required"]
    },
    category: {
      type: String,
      required: [true, "Category is required"]
    },
    stocks: {
      type: Number,
      required: false
    },
    images: {
      type: [String],
      required: [true, "images are required"]
    },
    variations: {
      type: {
        colors: [{
            name: String, img: String
        }],
        size: [{
            name: String, img: String
        }],
      },
      required: false
    },
    offers: {
      type: [{
        name: String, img: String
      }],
      required: false
    },
    rating: {
      type: Number,
      required: false
    },
    store: {
      type: String,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.models?.Products || model<IProduct>('Products', ProductsSchema);
export default Products;