import { successResponseWithData } from "../../helpers/apiResponse.js";
import orderModel from "../../models/Order/order.model.js";
import orderItemsModel from "../../models/Order/allorder.model.js";


export const allOrderslist = async (req, res) => {
  try {
    const userid = req.userid;

    const userorders = await orderModel
      .find({ userid: userid })
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          model: 'Product' 
        }
      });

    return successResponseWithData(
      res,
      "Orders fetched successfully",
      userorders
    );

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
      orderItems,
      totalAmount,
      userid,
      paymentMethod,
      paymentStatus,
      orderStatus,
      selectedAddress,
    } = req.body;

    // Create the AllOrder items dynamically
    const allOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const newOrderItem = new orderItemsModel({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
        });
        await newOrderItem.save();
        return newOrderItem._id; // Store the ID of the created AllOrder item
      })
    );

    // Create the order with references to the AllOrder items
    const createOrder = await new orderModel({
      orderItems: allOrderItems,
      totalAmount,
      userid,
      paymentMethod,
      paymentStatus,
      orderStatus,
      selectedAddress,
    }).save();

    return res.status(200).json({
      message: "Order Placed Successfully",
      data: createOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
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
