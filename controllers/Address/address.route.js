import express from "express"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
import { AddAddress, GetAllAddress } from "./address.controller.js"
const app=express.Router()

app.post('/add-address',CheckHeaderToken,AddAddress)
app.get('/get-all-address',CheckHeaderToken,GetAllAddress)



export default app