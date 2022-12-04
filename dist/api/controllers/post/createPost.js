"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.calculatePostCount = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Post_1 = require("../../../models/Post");
const User_1 = require("../../../models/User");
const calculatePostCount = async (userId) => {
    const postCount = await Post_1.Post.countDocuments({
        author: userId,
        isDeleted: false,
    });
    await User_1.User.findByIdAndUpdate(userId, { postCount });
};
exports.calculatePostCount = calculatePostCount;
exports.createPost = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const { content, image } = req.body;
    let post = await Post_1.Post.create({
        content,
        image,
        author: currentUserId,
    });
    await (0, exports.calculatePostCount)(currentUserId);
    post = await post.populate("author");
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { post }, null, "Create Post Success");
});
