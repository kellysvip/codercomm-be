import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";

import { FilterQuery } from "mongoose";
import { IGetPostQuery } from "../../../constants/interfaces/query.interface";
import { Friend, IFriend } from "../../../models/Friend";

export const getUsers = catchAsync(
  async (
    req: Request<{ userId: string }, any, {}, IGetPostQuery> & {
      userId: string;
    },
    res: Response,
    next: NextFunction
  ) => {
    //get data from request
    const currentUserId = req.userId;
    let { page, limit, ...filter } = { ...req.query };

    page = page || 1;
    limit = limit || 10;

    let filterConditions = [{ isDeleted: false }] as FilterQuery<IUser>;
    if (filter.name) {
      filterConditions.push({
        name: { $regex: filter.name, $options: "i" },
      });
    }

    const filterCriteria = filterConditions.length
      ? { $and: filterConditions }
      : ({} as FilterQuery<IUser>);

    const count = await User.countDocuments({ filterCriteria });
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    console.log(filterCriteria, count, totalPage, offset);
    let users = await User.find({ filterCriteria })
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit);

    // const promise = users?.map(async (user) => {   
    //   let temp = user.toJSON();
    //   temp.friendship = await Friend.findOne({
    //     $or: [
    //       { from: currentUserId, to: user._id },
    //       { from: user._id, to: currentUserId },
    //     ],
    //   }) as IUser
    //   return temp;
    // });
    // const usersWithFriendship = await Promise.all(promise)

    //Response
    sendResponse(
      res,
      200,
      true,
      { users, totalPage, count },
      null,
      "Get User Success"
    ); 
  }
);
