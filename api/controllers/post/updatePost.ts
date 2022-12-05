import { Response, NextFunction, Request } from "express";
import { IGetPostQuery } from "../../../constants/interfaces/query.interface";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Post } from "../../../models/Post";

export const updatePost = catchAsync(
  async (
    req: Request<{ postId: string }, {}, any, IGetPostQuery> & {
      userId: string;
    },
    res: Response,
    next: NextFunction
  ) => {
    //get data from request
    const currentUserId = req.userId; //errorts  req.userId
    const {
      params: { postId },
    } = req;

    let post = await Post.findById(postId);
    if (!post) throw new AppError(404, "Post not found", "Update Error");
    if (!post.author.equals(currentUserId))
      throw new AppError(400, "Only author can edit post", "Update Post Error");

    const allows = ["content", "image"];
    allows.forEach((field) => {
      if (req.body[field] !== undefined) {
        (post as any)[field] = req.body[field];
      }
    });
    await post.save();

    //Response
    sendResponse(res, 200, true, { post }, null, "Update Post Success");
  }
);
