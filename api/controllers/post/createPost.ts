import { Response, Request, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Post } from "../../../models/Post";
import { IUser, User } from "../../../models/User";

export const calculatePostCount = async (userId: string) => {
  const postCount = await Post.countDocuments({
    author: userId,
    isDeleted: false,
  });
  await User.findByIdAndUpdate(userId, { postCount });
};

export const createPost = catchAsync(
  async (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.userId; 
    const { content, image } = req.body;

    let post = await Post.create({
      content,
      image,
      author: currentUserId,
    });
    await calculatePostCount(currentUserId!)
    post = await post.populate("author");

    
    //Response
    sendResponse(res, 200, true, { post }, null, "Create Post Success");
  }
);
