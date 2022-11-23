import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Friend, IFriend } from "../../../models/Friend";

export const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.params; //req.userId validate
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

    //Response
    sendResponse(
      res,
      200,
      true,
      {}, //user errorts
      null,
      "Get Single User Success"
    );
  }
);
