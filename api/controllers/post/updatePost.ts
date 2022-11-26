import { Response, NextFunction } from "express";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Post } from "../../../models/Post";

export const updatePost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const postId = req.params.id;

    let post = await Post.findById(postId);
    if (!post) throw new AppError(404, "Post not found", "Update Error");
    if (!post.author.equals(currentUserId))
      throw new AppError(400, "Only author can edit post", "Update Post Error");

    const allows = ["content", "image"];
    allows.forEach((field) => {
      if (req.body[field] !== undefined) {
        // post[field] = req.body[field]
      }
    });
    await post.save();

    //Response
    sendResponse(res, 200, true, { post }, null, "Create Post Success");
  }
);
