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