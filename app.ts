import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
const indexRouter = require("./routes/index");
// import indexRouter from './routes/index'
import { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";
import { AppError, sendResponse } from "./helpers/ultis";
require("dotenv/config");

export const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MONGODB

// const mongoURI = 'mongodb+srv://admin:admin@cluster0.t244bsh.mongodb.net/coder_management'
// const mongoURI: string | undefined = process.env.MONGODB_URI
const mongoURI: string =
  "mongodb+srv://admin:admin@cluster0.t244bsh.mongodb.net/coder_management";
mongoose
  .connect(mongoURI)
  .then(async () => console.log(`DB connected ${mongoURI}`))
  .catch((err: string) => console.log(err));

//Error Handler
// app.unsubscribe((req: Request, res: Response, next: NextFunction )) => {  }

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.message = "404";
  next(err);
});

app.use((err: AppError , req: Request, res: Response, next: NextFunction) => {
  console.log("ERROR", err);
  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      { message: err.message },
      null,
      err.errorType
    );
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      { message: err.message },
      null,
      "Internal Server Error"
    );
  }
});

app.use("/api", indexRouter);
