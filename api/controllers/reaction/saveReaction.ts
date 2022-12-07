import { Response, Request, NextFunction } from "express";
import mongoose, { Types } from "mongoose";
import { IGetUserAuthInfoRequest } from "../../../constants/interfaces/request.interface";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import { Reaction } from "../../../models/Reaction";

export const calculateReactionCount = async (
  targetId: Types.ObjectId,
  targetType: string
) => {
  const stats = await Reaction.aggregate([
    {
      $match: { targetId: new Types.ObjectId(targetId) },
    },
    {
      $group: {
        _id: "$targetId",
        like: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "like"] }, 1, 0],
          },
        },
        dislike: {
          $sum: {
            $cond: [{ $eq: ["$emoji", "dislike"] }, 1, 0],
          },
        },
      },
    },
  ]);
  const reactions = {
    like: (stats[0] && stats[0].like || 0),
    dislike: (stats[0] && stats[0].dislike) || 0
  }
  await mongoose.model(targetType).findByIdAndUpdate(targetId, {reactions})
  return reactions
};

export const saveReaction = catchAsync(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.userId; //errorts  req.userId

    const { targetType, targetId, emoji } = req.body;

    // Check targetType exists
    const targetObj = await mongoose.model(targetType).findById(targetId);
    if (!targetObj)
      throw new AppError(
        400,
        `${targetType} not found`,
        "Create Reaction Error"
      );

    // Find the reaction if exists
    let reaction = await Reaction.findOne({
      targetType,
      targetId,
      author: currentUserId,
    });

    // If there is no reaction in the DB ->Create a new one
    if (!reaction) {
      reaction = await Reaction.create({
        targetType,
        targetId,
        author: currentUserId,
        emoji,
      });
    } else {
      // If there is ap revious reaction on the DB -> compare the emoji
      if (reaction.emoji === emoji) {
        // If they are the same -> delete the reaction
        await reaction.delete();
      } else {
        // If they are different -> update the reactio
        reaction.emoji = emoji;
        await reaction.save();
      }
    }

    const reactions = await calculateReactionCount(targetId, targetType)

    //Response
    sendResponse(res, 200, true, { reactions }, null, "Save Reaction Success");
  }
);
