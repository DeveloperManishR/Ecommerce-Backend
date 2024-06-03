import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
    type: [String],
      //required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);
export default  mongoose.model("Product",productSchema) 
