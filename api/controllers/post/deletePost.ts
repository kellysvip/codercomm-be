import { Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Post } from "../../../models/Post";
import { calculatePostCount } from "./createPost";

export const deletePost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const postId = req.params.id;

    const post = await Post.findByIdAndUpdate(
      { _id: postId, author: currentUserId },
      { isDeleted: true },
      { new: true }
    );
      console.log(post, postId);
    if (!post) throw new AppError(404, "Post not found or User not authorized", "Delete Post Error");
    await calculatePostCount(currentUserId)

    //Response
    sendResponse(res, 200, true, { post }, null, "Delete Post Success");
  }
);
