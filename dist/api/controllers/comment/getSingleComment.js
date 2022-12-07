"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleComment = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Comment_1 = require("../../../models/Comment");
exports.getSingleComment = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const commentId = req.params.id;
    console.log(commentId);
    let comment = await Comment_1.Comment.findById(commentId);
    if (!comment)
        throw new ultis_1.AppError(400, "Comment not found", "Get Single Comment Error");
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { comment }, null, "Get Single User Success");
});
