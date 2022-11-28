import { Response, Request, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Comment } from "../../../models/Comment";
import { Post } from "../../../models/Post";
import { IUser, User } from "../../../models/User";
import { Types } from 'mongoose';

export const calculateCommentCount = async (postId: Types.ObjectId) => {
    const commentCount = await Comment.countDocuments({
      post: postId,
      isDeleted: false,
    });
    await Post.findByIdAndUpdate(postId, { commentCount });
  };

export const createComment = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const { content, postId } = req.body;

    //Check post exists
    const post = Post.findById(postId);
    if (!post)
      throw new AppError(400, "Post not found", "Create new comment error");
    //Create new comment
    let comment = await Comment.create({
      author: currentUserId,
      post: postId,
      content,
    });

    //Update comment count
    await calculateCommentCount(postId)
    comment = await comment.populate("author")

    //Response
    return sendResponse(
      res,
      200,
      true,
      { comment },
      null,
      "Create New Commnent Success"
    );
  }
);
