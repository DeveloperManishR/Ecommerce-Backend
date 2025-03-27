import express from "express"
import { checkoutSession } from "./payment.controller.js";
import { CheckHeaderToken } from "../../helpers/authHelper.js";



const app = express.Router();

app.post('/checkout-session',CheckHeaderToken,checkoutSession)
export default app;