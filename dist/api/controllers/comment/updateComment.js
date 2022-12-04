"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateComment = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Comment_1 = require("../../../models/Comment");
exports.updateComment = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const commentId = req.params.id;
    const { content } = req.body;
    const comment = await Comment_1.Comment.findByIdAndUpdate({ _id: commentId }, { content }, { new: true });
    if (!comment)
        throw new ultis_1.AppError(400, "Comment not found or User not authorized", "Update Comment Error");
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { comment }, null, "Update Comment Success");
});
