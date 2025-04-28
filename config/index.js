import mongoose from "mongoose"

export const ConnectDB=async()=>{
   try{
   await mongoose.connect("mongodb://root:nDdWTmSemEhYtVF2e3xbsXGH0OZofdga6QXMeTcv4OzC5wW0keY8OZlDwXjUoh2u@82.29.161.196:5432/?directConnection=true")
   }catch(error){
    console.log("Error connection...", error);
   }
}