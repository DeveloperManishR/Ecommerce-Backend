import express from "express"
import {  AddMultipleProduct, Createproduct, DeleteProduct, GetAllproduct, GetSingleproductDetail, GetallCategory, updateProduct } from "./product.controller.js"
import {  uploadMultiImages } from "../../middlewares/multer.js"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
const app=express.Router()


  
  

app.post("/",CheckHeaderToken,uploadMultiImages.array("images",4),Createproduct)
app.get("/",GetAllproduct)
//app.get('/')
app.get('/category',GetallCategory)
app.get('/:id',GetSingleproductDetail)
app.put('/:id',CheckHeaderToken,uploadMultiImages.array("images",4),updateProduct)
app.delete('/:id',CheckHeaderToken,DeleteProduct)
app.post("/add-multiple-prodcuts",CheckHeaderToken,AddMultipleProduct)



export default app