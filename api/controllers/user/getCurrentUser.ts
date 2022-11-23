import { Response, Request, NextFunction } from "express";
import { User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";

export const getCurrentUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.params //req.userId validate

    const user =  await User.findById(currentUserId)
    //Validation
    if (!user) throw new AppError(400, "User not found", "Get Curent User Error");
    //Process
    //Response
    sendResponse(
      res,
      200,
      true,
      { user }, //user errorts
      null,
      "Get Current User Success"
    );
  }
);
