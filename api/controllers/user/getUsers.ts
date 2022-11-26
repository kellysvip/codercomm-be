import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import bcrypt from "bcryptjs";
import QueryString from "querystring";
import { Friend, IFriend } from "../../../models/Friend";
import { FilterQuery } from "mongoose";

interface Page {
  page: number;
  limit: number;
  name: string;
}

export const getUsers = catchAsync(
  async (req: Request<{}, {}, {}, Page>, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    let { page, limit, ...filter } = { ...req.query };

    page = page || 1;
    limit = limit || 10;

    
    let filterConditions = [] as FilterQuery<IUser>
    filterConditions = [{ isDeleted: false }];
    if (filter.name) {              
      filterConditions.push({
        name: { $regex: filter.name, $options: "i" },
      });
    }

   
    const filterCriteria = filterConditions.length ? { $and: filterConditions } : {} as FilterQuery<IUser>

    const count = await User.countDocuments({filterCriteria}) 
    const totalPage = Math.ceil(count / limit);
    const offset = limit * (page - 1);
    console.log(filterCriteria, count,
      totalPage,
      offset);
    let users = await User.find({filterCriteria}) 
      .sort({ createAt: -1 })
      .skip(offset)
      .limit(limit) 
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
    sendResponse(
      res,
      200,
      true,
      {users, totalPage, count },
      null,
      "Get User Success"
    ); //errorts
  }
);
