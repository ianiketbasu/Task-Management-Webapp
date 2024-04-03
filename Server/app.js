import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./Database/dbConnection.js";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./Middlewares/error.js";

const app = express();
dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    tempFileDir: true,
    useTempFiles: "/temp/",
  })
);

connectDB();

app.use(errorMiddleware);

export default app;
