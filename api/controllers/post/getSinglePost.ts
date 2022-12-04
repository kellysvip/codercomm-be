import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Friend, IFriend } from "../../../models/Friend";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { IPost, Post } from "../../../models/Post";
import { Comment } from "../../../models/Comment";
import { IGetPostQuery } from "../../../constants/interfaces/query.interface";

export const getSinglePost = catchAsync(
  async (req: Request<{ postId: string }, any, {}, IGetPostQuery> & {
    userId: string;
  }, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.userId; 
    console.log(currentUserId);
    const {
      params: { postId },
    } = req;

    let post = await Post.findById(postId) as IPost
    if (!post)
      throw new AppError(400, "Post not found", "Get Single Post Error");
    // post = await post.populate("author")

    post = post.toJSON()
    post.comment = await Comment.find({post: post._id}).populate("author")
    
    //Response
    sendResponse(
      res,
      200,
      true,
      {post}, 
      null,
      "Get Single User Success"
    );
  }
);
