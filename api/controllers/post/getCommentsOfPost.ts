import { Response, NextFunction, Request } from "express";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { Comment } from "../../../models/Comment";
import { IPost, Post } from "../../../models/Post";

interface Page {
  page: number;
  limit: number;
  name: string;
  id: string;
}

export const getCommentsOfPost = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const postId = req.params.id;

    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 1
    console.log(postId);
    const page = 1;
    const limit = 10;
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
