"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFriendRequest = void 0;
const ultis_1 = require("../../../helpers/ultis");
const User_1 = require("../../../models/User");
const Friend_1 = require("../../../models/Friend");
const friend_status_enum_1 = require("../../../constants/enums/friend-status.enum");
exports.sendFriendRequest = (0, ultis_1.catchAsync)(async (req, res, next) => {
    const currentUserId = req.userId;
    const toUserId = req.body.to;
    const user = await User_1.User.findById(toUserId);
    if (!user)
        throw new ultis_1.AppError(400, "User not found", "Send Friend Request Error");
    let friend = await Friend_1.Friend.findOne({
        $or: [
            { from: toUserId, to: currentUserId },
            { from: currentUserId, to: toUserId },
        ],
    });
    if (!friend) {
        // Create friend request
        friend = await Friend_1.Friend.create({
            from: currentUserId,
            to: toUserId,
            status: "pending",
        });
    }
    else {
        //status === pendding -> already send
        switch (friend.status) {
            case "pending":
                if (friend.from.equals(currentUserId)) {
                    throw new ultis_1.AppError(400, "You have already sent a request to this user", "Add Friend Error");
                }
                else {
                    throw new ultis_1.AppError(400, "You have received a request from this user", "Add Friend Error");
                }
                break;
            //status === accepted -> already friend
            case "accepted":
                throw new ultis_1.AppError(400, "Users are already friend", "Add friend Error");
                break;
            //status === decline -> update status to pending
            case "declined":
                friend.from = currentUserId;
                friend.to = toUserId;
                friend.status = friend_status_enum_1.FriendStatus.PENDING;
                await friend.save();
                return (0, ultis_1.sendResponse)(res, 200, true, { friend }, null, "Request has been sent");
                break;
            default:
                throw new ultis_1.AppError(400, "Friend status undefined", "Add friend Error");
                break;
        }
    }
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { friend }, null, "Send Friend Request Success");
});
