import { successResponseWithData } from "../../helpers/apiResponse.js"
import notificationModel from "../../models/Notification/notification.model.js"
export const createNotification=async(req,res)=>{
    try{
     
        const {message,userid}=req.body

        const newnotification=await notificationModel({
            userid,
            message
        }).save()

        

        

    }catch(error){

        console.log(error)
    }
}

export const allNotification=async(req,res)=>{
    const userid = req.userid;

     //console.log("no id",id)
    try{
               
        const AllNotification=await notificationModel.find({userid:userid})

        console.log("AllNotification",AllNotification)

        return(
            successResponseWithData(res,"All Notification fetched Sucessfully",AllNotification)
        )
    
    }catch(error){

    }
}