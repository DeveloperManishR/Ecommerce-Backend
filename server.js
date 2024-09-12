import { Server } from "socket.io"; 
import { createServer } from "http"; 

import app from "./index.js";
import cors from "cors";
import { handleSendAdminMessage } from "./helpers/NotificationHelper.js";

const server = createServer(app); // Create HTTP server
const port = process.env.PORT;

console.log(`Server Socket is listening at PORT:-${port}`);

server.listen(port);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    credentials: true,
  },
});
const userSockets = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("register", async (userId) => {
    console.log("user",userId)
    userSockets[userId] = socket.id;
    console.log("User registered with socket id:", userId, socket.id);

    console.log("userSockets",userSockets)
  });

  

  socket.on("newOrder",async(data)=>{
  console.log("data",data)
    try{
     await handleSendAdminMessage(data,userSockets,io)
    }catch(error){
      console.log(error)
    }
    
  })

  

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
