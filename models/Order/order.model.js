import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // orderItems: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "AllOrder",
        
    //   },
    // ],

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],

    totalAmount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      //  enum: ["CARD", "CASH"],
      //   default: "CASH",
    },
    paymentStatus: {
      type: String,
      //  enum: ["pending", "completed"],
      //  default: "pending",
    },
    orderStatus: {
      type: String,
      // enum: ["pending", "completed"],
      //   default: "pending",
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
