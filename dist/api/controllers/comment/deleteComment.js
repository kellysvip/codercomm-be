"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Comment_1 = require("../../../models/Comment");
const createComment_1 = require("./createComment");
exports.deleteComment = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const commentId = req.params.id;
    const comment = await Comment_1.Comment.findByIdAndDelete({
        _id: commentId,
        author: currentUserId,
    });
    if (!comment)
        throw new ultis_1.AppError(404, "Comment not found or User not authorized", "Delete Comment Error");
    await (0, createComment_1.calculateCommentCount)(comment.post);
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { comment }, null, "Delete Post Success");
});
