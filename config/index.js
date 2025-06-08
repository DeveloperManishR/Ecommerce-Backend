import mongoose from "mongoose"

export const ConnectDB=async()=>{
   try{
   await mongoose.connect(process.env.MONGO_URL)
   }catch(error){
    console.log("Error connection...", error);
   }
}