import { Response, Request, NextFunction } from "express";
import { IUser, User } from "../../../models/User";
import { sendResponse, AppError, catchAsync } from "../../../helpers/ultis";
import bcrypt from "bcryptjs";

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get data from request
    let { name, email, password } = req.body;
    //Validation
    let user = (await User.findOne({ email })) as IUser;
    if (user)
      throw new AppError(400, "UserId already exists", "Register Error");
    //Process
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = (await User.create({ name, email, password })) as unknown as IUser;

    const accessToken = await user.generateToken();

    //Response
    sendResponse(
      res,
      200,
      true,
      { user, accessToken },
      null,
      "Create User Success"
    );
  }
);
