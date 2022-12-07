"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const User_1 = require("../../../models/User");
const ultis_1 = require("../../../helpers/ultis");
exports.getCurrentUser = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId ||
    const user = await User_1.User.findById(currentUserId);
    //Validation
    if (!user)
        throw new ultis_1.AppError(400, "User not found", "Get Curent User Error");
    //Process
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { user }, null, "Get Current User Success");
});
