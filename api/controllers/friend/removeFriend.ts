import { Response, NextFunction } from "express";
import { sendResponse, catchAsync, AppError } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { Friend } from "../../../models/Friend";
import { calculateFriendCount } from "./reactFriendRequest";

export const removeFriend = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const currentUserId = req.userId;
    const friendId = req.params.userId;

    const friend = await Friend.findOne({
      $or: [
        {
          from: currentUserId,
          to: friendId,
        },
        {
          from: friendId,
          to: currentUserId,
        },
      ],
      status: "accepted",
    });
    if (!friend)
      throw new AppError(400, "Friend not found", "Remove Friend Error");

    await friend.delete();
    await calculateFriendCount(currentUserId);
    await calculateFriendCount(friendId);

    //Response
    sendResponse(res, 200, true, { friend }, null, "Remove Friend Success");
  }
);
