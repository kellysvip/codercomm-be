import jwt from "jsonwebtoken";
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_SECRET_KEY = "dkhfgfdgdfhfdjgdf";

import { AppError } from "../helpers/ultis";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { IGetUserAuthInfoRequest } from "../constants/requests/request-interface";

interface IJWTPayload {
  _id: mongoose.Types.ObjectId;
}


export const loginRequired = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenString = req.headers["www-authenticate"];
    console.log(tokenString);
    if (!tokenString)
      throw new AppError(401, "Login Required", "Authentication Error");

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token Expired", "Authentication Error");
        } else {
          throw new AppError(401, "Token is Invalid", "Authentication Error");
        }
      }
      const payload = decoded as IJWTPayload;
      console.log(payload._id);
      req.userId = payload._id
    });
    next();
  } catch (error) {
    next(error);
  }
};
