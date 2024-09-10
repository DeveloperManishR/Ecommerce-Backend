import express from "express"
import {  AddMultipleProduct, Createproduct, DeleteProduct, GetAllproduct, GetSingleproductDetail, GetallCategory, updateProduct } from "./product.controller.js"
import { upload } from "../../middlewares/multer.js"
const app=express.Router()


  
  

app.post("/create-product",upload.array("images",4),Createproduct)
app.get("/get-all-products",GetAllproduct)
app.get('/get-all-category',GetallCategory)
app.get('/getproduct-detail/:id',GetSingleproductDetail)
app.put('/update-product/:id',upload.array("images",4),updateProduct)
app.delete('/delete-product/:id',DeleteProduct)
app.post("/add-multiple-prodcuts",AddMultipleProduct)



export default app