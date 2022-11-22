import { sendResponse, AppError } from "../helpers/ultis";
import { ValidationChain, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";


export const checkObjectId = (paramId:string) => {
   if (!mongoose.Types.ObjectId.isValid(paramId)) {
    throw new Error("Invalid ObjectId")
   }

    return true
}
