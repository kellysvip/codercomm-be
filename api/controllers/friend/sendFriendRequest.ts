import { Response, NextFunction } from "express";
import { sendResponse, catchAsync, AppError } from "../../../helpers/ultis";
import { IGetUserAuthInfoRequest } from "../../../constants/requests/request-interface";
import { User } from "../../../models/User";
import { Friend, IFriend } from "../../../models/Friend";
import mongoose from "mongoose";
import { FriendStatus } from "../../../constants/enums/friend-status.enum";

export const sendFriendRequest = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const currentUserId = req.userId;
    const toUserId = req.body.to;

    const user = await User.findById(toUserId);
    if (!user)
      throw new AppError(400, "User not found", "Send Friend Request Error");

    let friend = await Friend.findOne({
      $or: [
        { from: toUserId, to: currentUserId },
        { from: currentUserId, to: toUserId },
      ],
    });

    if (!friend) {
      // Create friend request
      friend = await Friend.create({
        from: currentUserId,
        to: toUserId,
        status: "pending",
      });
    } else {
      //status === pendding -> already send
      switch (friend.status) {
        case "pending":
          if (friend.from.equals(currentUserId)) {
            throw new AppError(
              400,
              "You have already sent a request to this user",
              "Add Friend Error"
            );
          } else {
            throw new AppError(
              400,
              "You have received a request from this user",
              "Add Friend Error"
            );
          }
          break;
        //status === accepted -> already friend
        case "accepted":
          throw new AppError(
            400,
            "Users are already friend",
            "Add friend Error"
          );
          break;
        //status === decline -> update status to pending

        case "declined":
          friend.from = currentUserId;
          friend.to = toUserId;
          friend.status = FriendStatus.PENDING;
          await friend.save();
          return sendResponse(
            res,
            200,
            true,
            { friend },
            null,
            "Request has been sent"
          );
          break;

        default:
          throw new AppError(
            400,
            "Friend status undefined",
            "Add friend Error"
          );
          break;
      }
    }
    //Response
    sendResponse(
      res,
      200,
      true,
      { friend },
      null,
      "Send Friend Request Success"
    );
  }
);
