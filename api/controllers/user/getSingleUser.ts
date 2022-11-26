import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Friend, IFriend } from "../../../models/Friend";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";

export const getSingleUser = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //req.userId validate
    const userId = req.params.id;

    const user = await User.findById(userId) as IUser
    if (!user)
      throw new AppError(400, "User not found", "Get Single User Error");
    //Process

    user.friendship = await Friend.findOne({                
      $or: [
        { from: currentUserId, to: user._id },
        { from: user._id, to: currentUserId },
      ],
    }) as IFriend
    const friendship = user.friendship
    //Response
    sendResponse(
      res,
      200,
      true,
      {user,friendship}, 
      null,
      "Get Single User Success"
    );
  }
);
