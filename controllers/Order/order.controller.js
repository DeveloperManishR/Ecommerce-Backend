import { successResponseWithData } from "../../helpers/apiResponse.js";
import orderModel from "../../models/Order/order.model.js";

export const allOrderslist = async (req, res) => {
  try {
    const userid = req.userid;

    console.log("userid", userid);

    const userorders = await orderModel
      .find({ userid: userid })
      .populate("products.product");
    return successResponseWithData(
      res,
      "Orders fetched successfully",
      userorders
    );
    //.populate("orderby")
    //.exec();
    //  .populate("orderby")

    // console.log("orderList", userorders);
  } catch (error) {
    console.log(error);
  }
};

export const adminOrdersList = async (req, res) => {
  const getAllorders = await orderModel
    .find({})
    .populate("products.product")
    .populate("userid");
  console.log("getAllorders", getAllorders);

  return successResponseWithData(
    res,
    "Orders fetched successfully",
    getAllorders
  );
};

export const createOrder = async (req, res) => {
  try {
    const {
      products,
      totalAmount,

      userid,
      paymentMethod,
      paymentStatus,
      orderStatus,
      selectedAddress,
    } = req.body;

    console.log(
      products,
      totalAmount,

      userid,
      paymentMethod,
      paymentStatus,
      orderStatus,
      selectedAddress
    );
    const createOrder = await new orderModel({
      products,
      totalAmount,
      userid,
      paymentMethod,
      paymentStatus,
      orderStatus,
      selectedAddress,
    }).save();

    return successResponseWithData(
      res,
      "Order Placed Sucessfully",
      createOrder
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (req, res) => {
  const { status } = req.body;
  try {
    const productid = req.params.id;

    console.log("prod");

    const productDetails = await orderModel.find({ _id: productid });

    const updateProduct = await orderModel.findByIdAndUpdate(
      productid,
      {
        orderStatus: "completed",
        paymentStatus: "completed",
      },
      { new: true }
    );

    return successResponseWithData(
      res,
      "Order successfully updated",
      updateProduct
    );
  } catch (error) {
    console.log("err", error);
  }
};
