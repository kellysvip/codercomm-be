import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import bcrypt from "bcryptjs";
import QueryString from "querystring";
import { Friend, IFriend } from "../../../models/Friend";
import { Document, FilterQuery } from "mongoose";
import { Post } from "../../../models/Post";
import { Types } from "mongoose";

interface Page {
  page: number;
  limit: number;
  name: string;
  userId: string;
}

export const getPosts = catchAsync(
  async (req: Request<{}, {}, {}, Page>, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate

    let userId: any = {};
    userId = req.params;
    userId = userId.userId;

    let { page, limit, ...filter } = { ...req.query };

    const user = (await User.findById(userId)) as IUser;
    if (!user)
      throw new AppError(400, "User not found", "Get Single User Error");

    page = page || 1;
    limit = limit || 10;

    let userFriendIDs = await Friend.find({
      $or: [{ from: userId }, { to: userId }],
      status: "accepted",
    });
    let userFriendIDsAuth: Types.ObjectId[];
    if (userFriendIDs && userFriendIDs.length) {
      userFriendIDsAuth = userFriendIDs.map((friend) => {
        if (friend.from._id.equals(userId)) return friend.to;
        return friend.from;
      });
    } else {
      userFriendIDsAuth = [];
    }
    userFriendIDsAuth = [...userFriendIDsAuth, userId];

    let filterConditions = [] as FilterQuery<IUser>;
    filterConditions = [
      { isDeleted: false },
      { author: { $in: userFriendIDsAuth } },
    ];
    if (filter.name) {
      filterConditions.push({
        name: { $regex: filter.name, $options: "i" },
      });
    }

    const filterCriteria = filterConditions.length
      ? { $and: filterConditions }
      : ({} as FilterQuery<IUser>);

    const count = await Post.countDocuments({ filterCriteria });
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    console.log(filterCriteria, count, totalPage, offset);
    let posts = await Post.find({ filterCriteria })
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit)
      .populate("author");

    //Response
    sendResponse(
      res,
      200,
      true,
      { posts, totalPage, count },
      null,
      "Get User Success"
    ); //errorts
  }
);
