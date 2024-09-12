import express from "express"
import { createNotification } from "./notification.controller.js"
import { CheckHeaderToken } from "../../helpers/authHelper.js"

const app=express.Router()


app.post('/create-notification',CheckHeaderToken,createNotification)

export default app
