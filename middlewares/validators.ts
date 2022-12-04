import { sendResponse, AppError } from "../helpers/ultis";
import { ValidationChain, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate =
  (validationArray: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validationArray.map((validation) => validation.run(req)));
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    const message = errors
      .array()
      .map((error) => error.msg)
      .join(" & ");

    return sendResponse(res, 422, false, { message }, null, "Validator Error");
  };
