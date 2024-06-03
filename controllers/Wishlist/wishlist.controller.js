import {
  ErrorResponse,
  successResponse,
  successResponseWithData,
} from "../../helpers/apiResponse.js";
import wishlistModel from "../../models/Wishlist/wishlist.model.js";

export const AddtoWishlist = async (req, res) => {
  const userid = req.userid;
  const wishlistId = req.params.id;
  

  console.log("wishlistId",wishlistId)

  try {
    const wishlistItems = await wishlistModel.find({ userid: userid });

    if (wishlistItems.length === 0) {
      // If the wishlist is empty, add the product to the wishlist
      const addWishlistProduct = await wishlistModel({
        userid,
        wishlist: wishlistId,
      }).save();

      return successResponseWithData(
        res,
        "Product Added To wishlist Successfully",
        addWishlistProduct
      );
    } else {
      const isProductInWishlist = wishlistItems.some(
        (item) => item.wishlist == wishlistId
      );

      if (isProductInWishlist) {
        return successResponseWithData(res, "Product Is already in wishlist");
      } else {
        const addWishlistProduct = await wishlistModel({
          userid,
          wishlist: wishlistId,
        }).save();

        return successResponseWithData(
          res,
          "Product Added To wishlist Successfully",
          addWishlistProduct
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getWishlistProducts = async (req, res) => {
  try {
    const userid = req.userid;
    const Wishlistitems = await wishlistModel
      .find({ userid: userid })
      .populate("wishlist");

      console.log("Wishlistitems",Wishlistitems)
    return successResponseWithData(
      res,
      "Wishlist Products Fetch SucessFully",
      Wishlistitems
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishlistProduct = async (req, res) => {
  try {
    const userid = req.userid;
    const wishlistId = req.params.id;
    const wishlistItems = await wishlistModel.find({ userid: userid });

    const isProductInWishlist = wishlistItems.some(
      (item) => item._id == wishlistId
    );

    if (isProductInWishlist) {
      const deleteWishlistProduct = await wishlistModel.findByIdAndDelete(
        wishlistId
      );

      return successResponseWithData(
        res,
        "Product deleted from wishlist Successfully",
        deleteWishlistProduct
      );
    } else {
      return ErrorResponse(res, "Product not found ");
    }
  } catch (error) {
    console.log(error);
  }
};
