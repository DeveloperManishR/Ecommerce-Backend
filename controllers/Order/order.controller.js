import { successResponseWithData } from "../../helpers/apiResponse.js";
import orderModel from "../../models/Order/order.model.js";
import orderItemsModel from "../../models/Order/orderItemsModel.js";

export const allOrderslist = async (req, res) => {
  try {
    const userid = req.userid;

    const userorders = await orderModel
      .find({ userid: userid })
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate({
        path: "orderItems",
        populate: {
          path: "reviewid",
          model: "Review",
        },
      });

    /* 

 populate:{
        path:"reviewid",
        model:"Review"
      }
    */
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
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
      },
    })
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
  const { status, orderId } = req.body;
  try {
    const productid = req.params.id;

    console.log("status", status, orderId);

    const productDetails = await orderItemsModel.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    console.log(productDetails);
    return successResponseWithData(
      res,
      "Product Status Updated Sucessfully",
      productDetails
    );
  } catch (error) {
    console.log("err", error);
  }
};

export const filterProduct = async (req, res) => {
  try {
    const userid = req.userid;

    console.log("req.body", req.body);

    const { orderStatus } = req.body;

    console.log("user", userid, orderStatus);

    const userorders = await orderModel.find({ userid: userid }).populate({
      path: "orderItems",
      populate: {
        path: "product",
        model: "Product",
      },
    })
    .populate({
      path: "orderItems",
      populate: {
        path: "reviewid",
        model: "Review",
      },
    });

    // const newOrders = userorders.filter((order) =>
    //   order.orderItems.some((item) => item.orderStatus == orderStatus)
    // );

    // console.log("new", newOrders);

    const filterOrderItemsByStatus = (orderStatus) => {
      return userorders.map(order => {
        order.orderItems = order.orderItems.filter(item => item.orderStatus === orderStatus);
        return order;
      });
    };

    console.log("filterOrderItemsByStatusfilterOrderItemsByStatusfilterOrderItemsByStatusfilterOrderItemsByStatus",filterOrderItemsByStatus)
    


    const filteredOrders = filterOrderItemsByStatus(orderStatus);
   
    const newFilters = filteredOrders.map((item) => {
      if (item.orderItems.length !== 0) {
        return item;
      }
      return null; // To ensure you don't return undefined or empty values
    }).filter(item => item !== null);
    
    

    
    return successResponseWithData(
      res,
      "Orders fetched successfully",
      newFilters
    );
  } catch (error) {
    console.log(error);
  }
};
