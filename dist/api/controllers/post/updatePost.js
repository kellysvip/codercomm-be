"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Post_1 = require("../../../models/Post");
exports.updatePost = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const postId = req.params.id;
    let post = await Post_1.Post.findById(postId);
    if (!post)
        throw new ultis_1.AppError(404, "Post not found", "Update Error");
    if (!post.author.equals(currentUserId))
        throw new ultis_1.AppError(400, "Only author can edit post", "Update Post Error");
    const allows = ["content", "image"];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            // post[field] = req.body[field]
        }
    });
    await post.save();
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { post }, null, "Create Post Success");
});
