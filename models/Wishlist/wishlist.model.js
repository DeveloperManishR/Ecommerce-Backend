import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    wishlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Wishlist", wishlistSchema);
