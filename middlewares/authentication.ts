import jwt from "jsonwebtoken";
import { AppError } from "../helpers/ultis";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../models/User";
interface IJWTPayload {
  _id: string;
}


export const loginRequired = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenString = req.headers["authorization"];
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
      req.userId = payload._id;
    });
    
    next();
  } catch (error) {
    next(error);
  }
};
