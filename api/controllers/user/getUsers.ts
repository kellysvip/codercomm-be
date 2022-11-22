import { Response, Request, NextFunction } from "express";
import { User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import bcrypt from "bcryptjs";
import QueryString from "querystring";
import { Friend } from "../../../models/Friend";

interface Page {
  page: number;
  limit: number;
  name: string;
}

export const getUsers = catchAsync(
  async (req: Request<{}, {}, {}, Page>, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.params; //req.userId validate
    let { page, limit, ...filter } = { ...req.query };

    page = page || 1;
    limit = limit || 10;

    const filterConditions = [{ isDeleted: false }];
    // if (filter.name) {              errorts
    //   filterConditions.push({
    //     name: { $regex: filter.name, $options: "i" },
    //   });
    // }

    const filterCriteria = filterConditions.length
      ? { $and: filterConditions }
      : {};

    const count = await User.countDocuments(filterCriteria);
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);

    let users = await User.findOne(filterCriteria)
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit);
    // const promise = users.map(async (user) => {   //errorts
    //   let temp = user.toJSON();
    //   temp.friendship = await Friend.findOne({
    //     $or: [
    //       { from: currentUserId, to: user._id },
    //       { from: user._id, to: currentUserId },
    //     ],
    //   });
    //   return temp;
    // });
    // const usersWithFriendship = await Promise.all(promise)

    //Response
    sendResponse(
      res,
      200,
      true,
      { totalPage, count },
      null,
      "Create User Success"
    ); //errorts
  }
);
