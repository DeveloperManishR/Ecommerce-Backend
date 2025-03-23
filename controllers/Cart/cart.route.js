import express from "express"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
import { AddtoCart, DeletefromCart, decreaseProductquantity, getCartproducts, removeAllproductsFromCart } from "./cart.controller.js"

const app=express.Router()


app.post("/:id",CheckHeaderToken,AddtoCart)
app.get("/",CheckHeaderToken,getCartproducts)
app.put("/decrease/:id",CheckHeaderToken,decreaseProductquantity)
app.delete("/:id",CheckHeaderToken,DeletefromCart)
app.delete("/all-products-remove",CheckHeaderToken,removeAllproductsFromCart)



export default app