import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
