"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const User_1 = require("../../../models/User");
const ultis_1 = require("../../../helpers/ultis");
exports.getUsers = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    let { page, limit, ...filter } = { ...req.query };
    page = page || 1;
    limit = limit || 10;
    let filterConditions = [];
    filterConditions = [{ isDeleted: false }];
    if (filter.name) {
        filterConditions.push({
            name: { $regex: filter.name, $options: "i" },
        });
    }
    const filterCriteria = filterConditions.length ? { $and: filterConditions } : {};
    const count = await User_1.User.countDocuments({ filterCriteria });
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    console.log(filterCriteria, count, totalPage, offset);
    let users = await User_1.User.find({ filterCriteria })
        .sort({ createAt: -1 })
        .skip(offset)
        .limit(limit);
    console.log(users);
    // const promise = users?.map(async (user: IUser) => {   errorts
    //   let temp = user.toJSON();
    //   temp.friendship = await Friend.findOne({
    //     $or: [
    //       { from: currentUserId, to: user._id },
    //       { from: user._id, to: currentUserId },
    //     ],
    //   }) as IFriend
    //   return temp;
    // });
    // const usersWithFriendship = await Promise.all(promise)
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { users, totalPage, count }, null, "Get User Success"); //errorts
});
