import { Response, NextFunction } from "express";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { Comment } from "../../../models/Comment";

export const getSingleComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const commentId = req.params.id;
    console.log(commentId);

    let comment = await Comment.findById(commentId);
    if (!comment)
      throw new AppError(400, "Comment not found", "Get Single Comment Error");

    //Response
    sendResponse(res, 200, true, { comment }, null, "Get Single User Success");
  }
);
