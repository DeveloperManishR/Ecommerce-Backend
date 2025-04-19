import express from "express";
import { adminOrdersList, allOrderslist, createOrder, filterProduct, updateOrder } from "./order.controller.js";
import { CheckHeaderToken } from "../../helpers/authHelper.js";

const app = express.Router();

app.post("/",CheckHeaderToken, createOrder);
app.get("/users-get-all-orders", CheckHeaderToken, allOrderslist);
app.get("/get-all-orders",CheckHeaderToken, adminOrdersList);
app.put("/update-order",CheckHeaderToken,updateOrder)
app.post("/filter-product",CheckHeaderToken,filterProduct)

export default app;
