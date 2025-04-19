import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],

    totalAmount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
     
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    selectedAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
