"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSinglePost = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Post_1 = require("../../../models/Post");
const Comment_1 = require("../../../models/Comment");
exports.getSinglePost = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const postId = req.params.id;
    let post = await Post_1.Post.findById(postId);
    if (!post)
        throw new ultis_1.AppError(400, "Post not found", "Get Single Post Error");
    // post = await post.populate("author")
    post = post.toJSON();
    post.comment = await Comment_1.Comment.find({ post: post._id }).populate("author");
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { post }, null, "Get Single User Success");
});
