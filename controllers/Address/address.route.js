import express from "express"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
import { AddAddress, GetAllAddress } from "./address.controller.js"
const app=express.Router()

app.post('/',CheckHeaderToken,AddAddress)
app.get('/',CheckHeaderToken,GetAllAddress)



export default app