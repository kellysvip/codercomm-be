"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelFriendRequest = void 0;
const ultis_1 = require("../../../helpers/ultis");
const Friend_1 = require("../../../models/Friend");
exports.cancelFriendRequest = (0, ultis_1.catchAsync)(async (req, res, next) => {
    const currentUserId = req.userId;
    const toUserId = req.params.userId;
    const friend = await Friend_1.Friend.findOne({
        from: currentUserId,
        to: toUserId,
        status: "pending",
    });
    if (!friend)
        new ultis_1.AppError(400, "Friend Request not found", "Cancel Request Error");
    await friend?.delete();
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { friend }, null, "Cancel Request Success");
});
