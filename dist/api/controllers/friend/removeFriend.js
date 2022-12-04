"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Friend_1 = require("../../../models/Friend");
const reactFriendRequest_1 = require("./reactFriendRequest");
exports.removeFriend = (0, ultis_1.catchAsync)(async (req, res, next) => {
    const currentUserId = req.userId;
    const friendId = req.params.userId;
    const friend = await Friend_1.Friend.findOne({
        $or: [
            {
                from: currentUserId,
                to: friendId,
            },
            {
                from: friendId,
                to: currentUserId,
            },
        ],
        status: "accepted",
    });
    if (!friend)
        throw new ultis_1.AppError(400, "Friend not found", "Remove Friend Error");
    await friend.delete();
    await (0, reactFriendRequest_1.calculateFriendCount)(currentUserId);
    await (0, reactFriendRequest_1.calculateFriendCount)(friendId);
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { friend }, null, "Remove Friend Success");
});
