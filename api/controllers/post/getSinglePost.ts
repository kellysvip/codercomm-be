import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Friend, IFriend } from "../../../models/Friend";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { IPost, Post } from "../../../models/Post";
import { Comment } from "../../../models/Comment";

export const getSinglePost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const postId = req.params.id;

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
