"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = void 0;
const User_1 = require("../../../models/User");
const ultis_1 = require("../../../helpers/ultis");
const Friend_1 = require("../../../models/Friend");
exports.getSingleUser = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const userId = req.params.id;
    const user = await User_1.User.findById(userId);
    if (!user)
        throw new ultis_1.AppError(400, "User not found", "Get Single User Error");
    //Process
    user.friendship = await Friend_1.Friend.findOne({
        $or: [
            { from: currentUserId, to: user._id },
            { from: user._id, to: currentUserId },
        ],
    });
    const friendship = user.friendship;
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { user, friendship }, null, "Get Single User Success");
});
