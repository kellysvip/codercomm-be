import { Response, Request, NextFunction } from "express";
import { Post } from "../../../models/Post";
import { sendResponse, AppError } from "../../../helpers/ultis";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("Post Created");
};
