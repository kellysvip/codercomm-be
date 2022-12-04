"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Post_1 = require("../../../models/Post");
const createPost_1 = require("./createPost");
exports.deletePost = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const postId = req.params.id;
    const post = await Post_1.Post.findByIdAndUpdate({ _id: postId, author: currentUserId }, { isDeleted: true }, { new: true });
    console.log(post, postId);
    if (!post)
        throw new ultis_1.AppError(404, "Post not found or User not authorized", "Delete Post Error");
    await (0, createPost_1.calculatePostCount)(currentUserId);
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { post }, null, "Delete Post Success");
});
