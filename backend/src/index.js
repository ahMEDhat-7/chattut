import "dotenv/config";
import express from 'express';
import path from "path";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from "./routes/message.route.js";
import { dbConnect } from "./lib/db.config.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import { app, server } from "./lib/socket.js";
import asyncWrapper from "./middlewares/asyncWrapper.js";


const __dirname = path.resolve();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname,"../frontend/dist")));
  
  app.get("*",asyncWrapper((req, res, next) => {
      res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));    
  }))
}
app.use((err, req, res, next) => {
  console.log({
    status: err.statusText,
    error: {
      statusCode: err.statusCode,
      message: err.message,
    },
  });

  res.status(err.statusCode || 500).json({
    status: err.statusText,
    error: {
      statusCode: err.statusCode,
      message: err.message,
    },
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  dbConnect();
});