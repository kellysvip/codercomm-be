import { Response, Request, NextFunction } from "express";
import { User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Friend } from "../../../models/Friend";

export const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.params; //req.userId validate
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user)
      throw new AppError(400, "User not found", "Get Single User Error");
    //Process

    // user.friendship = await Friend.findOne({                errorts
    //   $or: [
    //     { from: currentUserId, to: user._id },
    //     { from: user._id, to: currentUserId },
    //   ],
    // });

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
