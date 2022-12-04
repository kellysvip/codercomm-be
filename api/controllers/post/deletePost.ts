import { Response, NextFunction, Request } from "express";
import { IGetPostQuery } from "../../../constants/interfaces/query.interface";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Post } from "../../../models/Post";
import { calculatePostCount } from "./createPost";

export const deletePost = catchAsync(
  async (
    req: Request<{ postId: string }, any, {}, IGetPostQuery> & {
      userId: string;
    },
    res: Response,
    next: NextFunction
  ) => {
    //get data from request
    const currentUserId = req.userId;
    const {
      params: { postId },
    } = req;

    const post = await Post.findByIdAndUpdate(
      { _id: postId, author: currentUserId },
      { isDeleted: true },
      { new: true }
    );
    if (!post)
      throw new AppError(
        404,
        "Post not found or User not authorized",
        "Delete Post Error"
      );
    await calculatePostCount(currentUserId as unknown as string);

    //Response
    sendResponse(res, 200, true, { post }, null, "Delete Post Success");
  }
);
