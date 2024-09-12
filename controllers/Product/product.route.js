import express from "express"
import {  AddMultipleProduct, Createproduct, DeleteProduct, GetAllproduct, GetSingleproductDetail, GetallCategory, updateProduct } from "./product.controller.js"
import { upload } from "../../middlewares/multer.js"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
const app=express.Router()


  
  

app.post("/create-product",CheckHeaderToken,upload.array("images",4),Createproduct)
app.get("/get-all-products",GetAllproduct)
app.get('/get-all-category',GetallCategory)
app.get('/getproduct-detail/:id',GetSingleproductDetail)
app.put('/update-product/:id',CheckHeaderToken,upload.array("images",4),updateProduct)
app.delete('/delete-product/:id',CheckHeaderToken,DeleteProduct)
app.post("/add-multiple-prodcuts",CheckHeaderToken,AddMultipleProduct)



export default app