import { Response, NextFunction } from "express";
import { sendResponse, catchAsync, AppError } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { Friend } from "../../../models/Friend";

export const cancelFriendRequest = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const currentUserId = req.userId;
    const toUserId = req.params.userId;

    const friend = await Friend.findOne({
      from: currentUserId,
      to: toUserId,
      status: "pending",
    });
    if (!friend)
      new AppError(400, "Friend Request not found", "Cancel Request Error");
    await friend?.delete();
    //Response
    sendResponse(res, 200, true, { friend }, null, "Cancel Request Success");
  }
);
