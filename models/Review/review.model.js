import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
{
  userid:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  product:{
    type:mongoose.Schema.ObjectId,
    ref:"Product"
  },
  rating:{
    type :Number
  },
  comment:{
   type:String
  }

},{timestamps:true}
)
export default  mongoose.model("Review",reviewSchema) 
