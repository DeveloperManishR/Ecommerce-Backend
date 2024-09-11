import { Server } from "socket.io"; // Correct import from socket.io
import { createServer } from "http"; // One import for http is enough
import app from "./index.js";
import cors from "cors";

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

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("register", async (userId) => {
    console.log("User registered with socket id:", userId, socket.id);
  });

  socket.on("newOrder",async(data)=>{
    console.log("New Order has been placed",data)
  })

  

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});
