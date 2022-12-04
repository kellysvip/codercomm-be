import { Response, Request, NextFunction } from "express";
import { User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";


export const getCurrentUser = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId =  req.userId 
    const user =  await User.findById(currentUserId)
    //Validation
    if (!user) throw new AppError(400, "User not found", "Get Curent User Error");
    //Process
    //Response
    sendResponse(
      res,
      200,
      true,
      { user }, 
      null,
      "Get Current User Success"
    );
  }
);
