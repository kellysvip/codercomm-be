"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFriendRequest = exports.calculateFriendCount = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Friend_1 = require("../../../models/Friend");
const User_1 = require("../../../models/User");
const calculateFriendCount = async (userId) => {
    const friendCount = await Friend_1.Friend.countDocuments({
        $or: [{ from: userId }, { to: userId }],
        status: "accepted",
    });
    await User_1.User.findByIdAndUpdate(userId, { friendCount: friendCount });
};
exports.calculateFriendCount = calculateFriendCount;
exports.reactFriendRequest = (0, ultis_1.catchAsync)(async (req, res, next) => {
    const currentUserId = req.userId; // To
    const fromUserId = req.params.userId; //From
    const { status } = req.body;
    let friend = await Friend_1.Friend.findOne({
        from: fromUserId,
        to: currentUserId,
        status: "pending",
    });
    if (!friend)
        throw new ultis_1.AppError(400, "Friend Request not found", "React Friend Request Error");
    friend.status = status;
    await friend.save();
    if (status === "accepted") {
        await (0, exports.calculateFriendCount)(currentUserId);
        await (0, exports.calculateFriendCount)(fromUserId);
    }
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { friend }, null, "React Friend Request Success");
});
