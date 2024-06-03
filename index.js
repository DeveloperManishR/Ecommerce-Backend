import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/index.js";
import allRoutes from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
dotenv.config();

ConnectDB();
const app = express();
app.use(express.json());
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
//app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false, limit: 1000 }));
app.use(cors("*"));

app.use("/api", allRoutes);
app.use('/public', express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`app is Listen on ${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Server is running on Port ${process.env.PORT}</h1>`);
});
