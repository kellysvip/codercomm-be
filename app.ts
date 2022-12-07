import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
// const indexRouter = require("./routes/index");
import router from "./routes/index";
import { NextFunction, Request, Response } from "express";

import mongoose from "mongoose";
import { AppError, sendResponse } from "./helpers/ultis";
import createHttpError from 'http-errors'
import httpStatus from "http-status";

require("dotenv/config");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MONGODB

const mongoURI: string =
process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin@cluster0.t244bsh.mongodb.net/coder_comm_test";

mongoose
  .connect(mongoURI)
  .then(async () => console.log(`DB connected ${mongoURI}`))
  .catch((err: string) => console.log(err));

//Error Handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  // const err = createHttpError(httpStatus.NOT_FOUND, 'Not Found')
  err.statusCode = 404;;
  err.message = "Not Found"
  next(err);
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
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

app.use("/api", router);

export default app;
module.exports = app;


