"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFriendList = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Friend_1 = require("../../../models/Friend");
const User_1 = require("../../../models/User");
exports.getFriendList = (0, ultis_1.catchAsync)(async (req, res, next) => {
    let { page, limit, ...filter } = req.query;
    let currentUserId = {};
    currentUserId = req.params;
    currentUserId = currentUserId.userId;
    let friendList = await Friend_1.Friend.find({
        $or: [{ from: currentUserId }, { to: currentUserId }],
        status: "accepted",
    });
    const friendIDs = friendList.map((friend) => {
        if (friend.from._id.equals(currentUserId))
            return friend.to;
        return friend.from;
    });
    let filterConditions = [{ _id: { $in: friendIDs } }];
    if (filter.name) {
        filterConditions.push({
            name: { $regex: filter.name, $options: "i" },
        });
    }
    const filterCriteria = filterConditions.length
        ? { $and: filterConditions }
        : {};
    page = page || 1;
    limit = limit || 10;
    const count = await User_1.User.countDocuments({ filterCriteria });
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    const users = await User_1.User.find({ filterCriteria })
        .sort({ createAt: -1 })
        .skip(offset)
        .limit(limit);
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { users, totalPage }, null, "Get Friend List Success");
});
