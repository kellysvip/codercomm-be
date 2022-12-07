import { Response, NextFunction, Request } from "express";
import { sendResponse, catchAsync } from "../../../helpers/ultis";
import { Friend } from "../../../models/Friend";
import { IUser, User } from "../../../models/User";
import { FilterQuery } from "mongoose";
import { IGetPostQuery } from "../../../constants/interfaces/query.interface";

export const getFriendList = catchAsync(
  async (
    req: Request<{ userId: string }, any, {}, IGetPostQuery> & {
      userId: string;
    },
    res: Response,
    next: NextFunction
  ) => {
    let { page, limit, ...filter } = req.query;

    let currentUserId: any = {};
    currentUserId = req.params;
    currentUserId = currentUserId.userId;

    let friendList = await Friend.find({
      $or: [{ from: currentUserId }, { to: currentUserId }],
      status: "accepted",
    });

    const friendIDs = friendList.map((friend) => {
      if (friend.from._id.equals(currentUserId)) return friend.to;
      return friend.from;
    });

    let filterConditions = [{ _id: { $in: friendIDs } }] as FilterQuery<IUser>;

    if (filter.name) {
      filterConditions.push({
        name: { $regex: filter.name, $options: "i" },
      });
    }

    const filterCriteria = filterConditions.length
      ? { $and: filterConditions }
      : ({} as FilterQuery<IUser>);

    page = page || 1;
    limit = limit || 10;
    const count = await User.countDocuments({ filterCriteria });
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);

    const users = await User.find({ filterCriteria })
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit);

    //Response
    sendResponse(
      res,
      200,
      true,
      { users, totalPage },
      null,
      "Get Friend List Success"
    );
  }
);
