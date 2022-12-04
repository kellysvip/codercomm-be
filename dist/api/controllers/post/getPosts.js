"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
const User_1 = require("../../../models/User");
const ultis_1 = require("../../../helpers/ultis");
const Friend_1 = require("../../../models/Friend");
const Post_1 = require("../../../models/Post");
exports.getPosts = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    let userId = {};
    userId = req.params;
    userId = userId.userId;
    let { page, limit, ...filter } = { ...req.query };
    const user = (await User_1.User.findById(userId));
    if (!user)
        throw new ultis_1.AppError(400, "User not found", "Get Single User Error");
    page = page || 1;
    limit = limit || 10;
    let userFriendIDs = await Friend_1.Friend.find({
        $or: [{ from: userId }, { to: userId }],
        status: "accepted",
    });
    let userFriendIDsAuth;
    if (userFriendIDs && userFriendIDs.length) {
        userFriendIDsAuth = userFriendIDs.map((friend) => {
            if (friend.from._id.equals(userId))
                return friend.to;
            return friend.from;
        });
    }
    else {
        userFriendIDsAuth = [];
    }
    userFriendIDsAuth = [...userFriendIDsAuth, userId];
    let filterConditions = [];
    filterConditions = [
        { isDeleted: false },
        { author: { $in: userFriendIDsAuth } },
    ];
    if (filter.name) {
        filterConditions.push({
            name: { $regex: filter.name, $options: "i" },
        });
    }
    const filterCriteria = filterConditions.length
        ? { $and: filterConditions }
        : {};
    const count = await Post_1.Post.countDocuments({ filterCriteria });
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    console.log(filterCriteria, count, totalPage, offset);
    let posts = await Post_1.Post.find({ filterCriteria })
        .sort({ createAt: -1 })
        .skip(offset)
        .limit(limit)
        .populate("author");
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { posts, totalPage, count }, null, "Get User Success"); //errorts
});
