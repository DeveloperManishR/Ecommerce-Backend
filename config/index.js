import mongoose from "mongoose"

export const ConnectDB=async()=>{
   try{
   await mongoose.connect("mongodb+srv://Manish:f54PbTgjvDVAtyzr@cluster0.nfxrx.mongodb.net/ecommerce")
   }catch(error){
    console.log("Error connection...", error);
   }
}