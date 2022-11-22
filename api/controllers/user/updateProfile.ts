import { Response, Request, NextFunction } from "express";
import { User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import bcrypt from "bcryptjs";

export const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get data from request
    const currentUserId = req.params.id; //req.userId validate
    const userId = req.params.id;

    if (currentUserId !== userId)
      throw new AppError(400, "Permission Required", "Update User Error");
    const user = await User.findById(userId);
    if (!user) throw new AppError(400, "User not found", "Update User Error");

    const allows = [
      "name",
      "avatarUrl",
      "coverUrl",
      "aboutMe",
      "city",
      "country",
      "company",
      "jobTitle",
      "facebookLink",
      "instagramLink",
      "linkedinLink",
      "twitterLink",
    ];
    allows.forEach((field: string) => {
      if (req.body[field] !== undefined) {
        // user[field] = req.body[field];  errorts
      }
    });
    await user.save();

    //Process

    //Response
    sendResponse(res, 200, true, {}, null, "Update User Success"); //{user}  errorts
  }
);
