import mongoose from "mongoose";


const addressSchema=new mongoose.Schema({

    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name:{
        type: String,
        required: true,
      },

      phone: {
        type: Number,
        required: true,
      },

      street:{
        type:String,
        required: true,
      },

      state:{
        type:String
      },
      
      city:{
        type:String
      },
      zipcode:{
        type:Number
      }

      

      
}, { timestamps: true })

export default mongoose.model("Addres", addressSchema);
