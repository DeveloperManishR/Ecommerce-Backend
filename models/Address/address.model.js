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

      phoneno: {
        type: Number,
        required: true,
      },

      address:{
        type:String,
        required: true,
      },

      state:{
        type:Object
      },
      
      city:{
        type:Object
      }

      

      
}, { timestamps: true })

export default mongoose.model("Addres", addressSchema);
