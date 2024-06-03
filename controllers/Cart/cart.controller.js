import {
  ErrorResponse,
  successResponse,
  successResponseWithData,
} from "../../helpers/apiResponse.js";
import cartModel from "../../models/Cart/cart.model.js";

export const AddtoCart = async (req, res) => {
  const userid = req.userid;
  const productid = req.params.id;

  console.log("productid", productid);

  try {
    const cartItems = await cartModel.find({ userid: userid });

    // console.log("cartIems",cartItems)

    if (cartItems.length === 0) {
      const cartproduct = await new cartModel({
        userid,
        product: productid,
        quantity: 1,
      }).save();

      return successResponseWithData(
        res,
        "Product Added To cart Sucessfully",
        cartproduct
      );
    } else {
      const isProductInCartlist = cartItems.some(
        (item) => item.product == productid
      );

      if (isProductInCartlist) {
        const productDetail = await cartModel.find({
          userid: userid,
          product: productid,
        });

        const increasequantity = productDetail[0].quantity + 1;

        const cartproduct = await cartModel.findByIdAndUpdate(
          productDetail[0]._id,
          { quantity: increasequantity },
          { new: true }
        );

        return successResponseWithData(
          res,
          "Product Added To cart Sucessfully",
          cartproduct
        );
      } else {
        const cartproduct = await new cartModel({
          userid,
          product: productid,
          quantity: 1,
        }).save();

        return successResponseWithData(
          res,
          "Product Added To cart Sucessfully",
          cartproduct
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCartproducts = async (req, res) => {
  const userid = req.userid;

  try {
    const cartItems = await cartModel
      .find({ userid: userid })
      .populate("product");
    return successResponseWithData(res, "All carts Products", cartItems);
  } catch (error) {
    console.log(error);
  }
};

export const DeletefromCart = async (req, res) => {
  try {
    const cartid = req.params.id;

    const deleteCartItems = await cartModel.findByIdAndDelete(cartid);

    if (!deleteCartItems) {
      return ErrorResponse(res, "Product not found");
    }

    return successResponse(res, "Product removed from cart Sucessfully");
  } catch (error) {
    console.log(error);
  }
};

export const decreaseProductquantity = async (req, res) => {
  try {
    const userid = req.userid;
    const productid = req.params.id;

    const cartItems = await cartModel.find({
      userid: userid,
      product: productid,
    });

    if (cartItems) {
      if (cartItems[0].quantity == 1) {
        const deleteCartItems = await cartModel.findByIdAndDelete(
          cartItems[0]._id
        );

        if (!deleteCartItems) {
          return ErrorResponse(res, "Product not found");
        }

        return successResponse(res, deleteCartItems);
      } else {
        const decreaseQuantity = cartItems[0].quantity - 1;
        console.log(decreaseQuantity);

        const updateCartItem = await cartModel.findByIdAndUpdate(
          cartItems[0]._id,
          { quantity: decreaseQuantity },
          { new: true }
        );
        return successResponseWithData(
          res,
          "Product Quantity decreased Sucessfully",
          updateCartItem
        );
      }
    } else {
    }
  } catch (error) {
    console.log(error);
  }
};

