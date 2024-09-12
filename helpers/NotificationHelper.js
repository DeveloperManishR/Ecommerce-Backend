import notificationModel from "../models/Notification/notification.model.js";
import userModel from "../models/User/user.model.js";

export const handleSendAdminMessage = async (data,userSockets, io) => {
  try {
    const adminNotificationMessage = `A new order is placed by the user ${data.name} `;

    const adminUser = await userModel.findOne({ role: "ADMIN" });
    const adminSocketId = userSockets[adminUser._id];
    if (adminSocketId) {
      console.log("reached", adminSocketId);
      io.to(adminSocketId).emit("newNotification", {
        message: adminNotificationMessage,
      });


     

      const newnotification=await notificationModel({
       userid: adminUser._id,
       message:   adminNotificationMessage
      })
      await newnotification.save();

    }else{

      const newnotification=await notificationModel({
        userid: adminUser._id,
        message:   adminNotificationMessage
       })
       await newnotification.save();
    }
  } catch (error) {
    console.log("error", error);
  }
};
