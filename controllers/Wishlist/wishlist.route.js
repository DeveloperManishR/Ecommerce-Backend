import express from "express"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
import { AddtoWishlist, deleteWishlistProduct, getWishlistProducts } from "./wishlist.controller.js"

const app=express.Router()


app.post("/add-to-wishlist/:id",CheckHeaderToken,AddtoWishlist)
app.get("/get-wishlist-products",CheckHeaderToken,getWishlistProducts)
app.delete('/delete-wishlist-product/:id',CheckHeaderToken,deleteWishlistProduct)

export default app