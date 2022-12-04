import { Response, Request, NextFunction } from "express";
import { FilterQuery } from "mongoose";
import { IGetPostQuery } from "../../../constants/interfaces/query.interface";
import { sendResponse, catchAsync } from "../../../helpers/ultis";
import { Friend, IFriend } from "../../../models/Friend";
import { IUser, User } from "../../../models/User";



export const getReceivedFriendRequestList = catchAsync(
  async (req: Request<{ userId: string }, any, {}, IGetPostQuery> & {
    userId: string;
  }, res: Response, next: NextFunction) => {
    let { page, limit, ...filter } = req.query;

    let currentUserId: any = {};
    currentUserId = req.params;
    currentUserId = currentUserId.userId;
    // from: 123 to 456
    //from: 111 to 222
    //from 789 to 123
    let requestList = await Friend.find({
      to: currentUserId,
      status: "pending",
    });
    // from: 123 to 456
    //from 789 to 123

    const requesterIDs = requestList.map((friend) => {
      if (friend.from._id.equals(currentUserId)) return friend.to;
      return friend.from;
    });

    let filterConditions = [
      { _id: { $in: requesterIDs } },
    ] as FilterQuery<IUser>;
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

    // const usersWithFriendship = users.map((user) => { errorts
    //   let temp = user.toJSON();
    //   temp.friendship = requestList.find((friendship) => {
    //     if (
    //       friendship.from.equals(user._id) ||
    //       friendship.to.equals(user._id)
    //     ) {
    //       return { status: friendship.status };
    //     }
    //     return false;
    //   });
    //   return temp
    // })

    //Response
    sendResponse(
      res,
      200,
      true,
      { users, totalPage, count },
      null,
      "Get Single User Success"
    );
  }
);
