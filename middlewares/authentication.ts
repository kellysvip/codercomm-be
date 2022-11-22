import jwt from "jsonwebtoken";
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_SECRET_KEY = "dkhfgfdgdfhfdjgdf";

import { AppError } from "../helpers/ultis";
import { NextFunction, Request, Response } from "express";

export const loginRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenString = req.headers["www-authenticate"];
    console.log(tokenString);
    if (!tokenString)
      throw new AppError(401, "Login Required", "Authentication Error");

    const token = tokenString.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new AppError(401, "Token Expired", "Authentication Error");
        } else {
          throw new AppError(401, "Token is Invalid", "Authentication Error");
        }
      }
    //   req.userId = payload._id  errorts
    });
    next()
  } catch (error) {
    next(error);
  }
};
