import express from "express"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
import { AddtoWishlist, deleteWishlistProduct, getWishlistProducts } from "./wishlist.controller.js"

const app=express.Router()


app.post("/:id",CheckHeaderToken,AddtoWishlist)
app.get("/",CheckHeaderToken,getWishlistProducts)
app.delete('/:id',CheckHeaderToken,deleteWishlistProduct)

export default app