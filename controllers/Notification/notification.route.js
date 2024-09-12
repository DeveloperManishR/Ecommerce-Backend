import express from "express"
import { allNotification, createNotification } from "./notification.controller.js"
import { CheckHeaderToken } from "../../helpers/authHelper.js"

const app=express.Router()


app.post('/create-notification',CheckHeaderToken,createNotification)
app.get('/get-all-notification/:id',CheckHeaderToken,allNotification)

export default app
