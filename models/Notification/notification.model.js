import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  message:{
    type:String,

  },


},{timestamps:true});

export default mongoose.model("Notification", notificationSchema);
