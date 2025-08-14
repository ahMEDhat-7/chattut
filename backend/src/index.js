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


const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "prod") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use((err, req, res, next) => {
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