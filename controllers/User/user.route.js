import express from "express"
import { LoginUser, RegisterUser, getAllusers, getUser, updateProfilePic } from "./user.controller.js"
import { CheckHeaderToken } from "../../helpers/authHelper.js"
import { upload } from "../../middlewares/multer.js"

const app=express.Router()


app.post(`/register`,RegisterUser)
app.post(`/login`,LoginUser)
app.get("/get-all-users",getAllusers)
app.get("/getUserById/:id",getUser)
app.put("/update-profile-pic",CheckHeaderToken,upload.single("photos"),updateProfilePic)

export default app