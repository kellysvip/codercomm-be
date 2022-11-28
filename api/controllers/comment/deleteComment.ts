import { Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Comment } from "../../../models/Comment";
import { Post } from "../../../models/Post";
import { calculateCommentCount } from "./createComment";

export const deleteComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const commentId = req.params.id;

    const comment = await Comment.findByIdAndDelete({
      _id: commentId,
      author: currentUserId,
    });
    if (!comment)
      throw new AppError(
        404,
        "Comment not found or User not authorized",
        "Delete Comment Error"
      );
    await calculateCommentCount(comment.post);

    //Response
    sendResponse(res, 200, true, { comment }, null, "Delete Post Success");
  }
);
