"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const User_1 = require("../../../models/User");
const ultis_1 = require("../../../helpers/ultis");
exports.updateProfile = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const userId = req.params.id;
    if (currentUserId !== userId)
        throw new ultis_1.AppError(400, "Permission Required", "Update User Error");
    const user = await User_1.User.findById(userId);
    if (!user)
        throw new ultis_1.AppError(400, "User not found", "Update User Error");
    const allows = [
        "name",
        "avatarUrl",
        "coverUrl",
        "aboutMe",
        "city",
        "country",
        "company",
        "jobTitle",
        "facebookLink",
        "instagramLink",
        "linkedinLink",
        "twitterLink",
    ];
    allows.forEach((field) => {
        if (req.body[field] !== undefined) {
            // user[field] = req.body[field];  errorts
        }
    });
    await user.save();
    //Process
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { user }, null, "Update User Success"); //{user}  errorts
});
