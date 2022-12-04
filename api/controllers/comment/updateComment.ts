import { Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Comment } from "../../../models/Comment";
import { Post } from "../../../models/Post";

export const updateComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.userId; 
    const commentId = req.params.id;
    const { content } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      { content },
      { new: true }
    );
    if (!comment)
      throw new AppError(
        400,
        "Comment not found or User not authorized",
        "Update Comment Error"
      );

    //Response
    sendResponse(res, 200, true, { comment }, null, "Update Comment Success");
  }
);
