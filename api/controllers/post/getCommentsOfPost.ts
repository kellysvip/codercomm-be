import { Response, NextFunction, Request } from "express";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { Comment } from "../../../models/Comment";
import { IPost, Post } from "../../../models/Post";
import { IGetPostQuery } from "../../../constants/interfaces/query.interface";

export const getCommentsOfPost = catchAsync(
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
    let { page, limit, ...filter } = { ...req.query };

    page = page || 1;
    limit = limit || 10;
    
    // Validate post exists
    let post = (await Post.findById(postId)) as IPost;
    if (!post)
      throw new AppError(400, "Post not found", "Get Single Post Error");
    //Get comment
    const count = await Comment.countDocuments({ post: postId });
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);

    const comment = await Comment.find({ post: postId })
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author");

    //Response
    sendResponse(
      res,
      200,
      true,
      { comment, totalPage, count },
      null,
      "Get Single User Success"
    );
  }
);
