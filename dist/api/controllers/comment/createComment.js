"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.calculateCommentCount = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Comment_1 = require("../../../models/Comment");
const Post_1 = require("../../../models/Post");
const calculateCommentCount = async (postId) => {
    const commentCount = await Comment_1.Comment.countDocuments({
        post: postId,
        isDeleted: false,
    });
    await Post_1.Post.findByIdAndUpdate(postId, { commentCount });
};
exports.calculateCommentCount = calculateCommentCount;
exports.createComment = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const { content, postId } = req.body;
    //Check post exists
    const post = Post_1.Post.findById(postId);
    if (!post)
        throw new ultis_1.AppError(400, "Post not found", "Create new comment error");
    //Create new comment
    let comment = await Comment_1.Comment.create({
        author: currentUserId,
        post: postId,
        content,
    });
    //Update comment count
    await (0, exports.calculateCommentCount)(postId);
    comment = await comment.populate("author");
    //Response
    return (0, ultis_1.sendResponse)(res, 200, true, { comment }, null, "Create New Commnent Success");
});
