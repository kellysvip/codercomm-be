import { Response, NextFunction } from "express";
import { sendResponse, catchAsync, AppError } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { Friend } from "../../../models/Friend";
import mongoose from "mongoose";
import { User } from "../../../models/User";
export const calculateFriendCount = async (
  userId: mongoose.Types.ObjectId | string
) => {
  const friendCount = await Friend.countDocuments({
    $or: [{ from: userId }, { to: userId }],
    status: "accepted",
  });
  await User.findByIdAndUpdate(userId, { friendCount: friendCount });
};
export const reactFriendRequest = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const currentUserId = req.userId; // To
    const fromUserId = req.params.userId; //From
    const { status } = req.body;

    let friend = await Friend.findOne({
      from: fromUserId,
      to: currentUserId,
      status: "pending",
    });
    if (!friend)
      throw new AppError(
        400,
        "Friend Request not found",
        "React Friend Request Error"
      );
    friend.status = status;
    await friend.save();
    if (status === "accepted") {
      await calculateFriendCount(currentUserId);
      await calculateFriendCount(fromUserId);
    }

    //Response
    sendResponse(
      res,
      200,
      true,
      { friend },
      null,
      "React Friend Request Success"
    );
  }
);
