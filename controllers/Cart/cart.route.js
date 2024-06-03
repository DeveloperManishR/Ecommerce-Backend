import express from "express"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
import { AddtoCart, DeletefromCart, decreaseProductquantity, getCartproducts } from "./cart.controller.js"

const app=express.Router()


app.post("/add-to-cart/:id",CheckHeaderToken,AddtoCart)
app.get("/get-cart-products",CheckHeaderToken,getCartproducts)
app.put("/decrease-product-quantity/:id",CheckHeaderToken,decreaseProductquantity)
app.delete("/remove-from-cart/:id",CheckHeaderToken,DeletefromCart)



export default app