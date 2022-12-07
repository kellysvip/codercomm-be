import { Request } from "express"
import mongoose from "mongoose";
export interface IGetUserAuthInfoRequest extends Request {
  userId: mongoose.Types.ObjectId // or any other type
  page: number;
  limit: number;
  name: string;
}

export interface IGetPostInfoRequest extends Request {
  userId: mongoose.Types.ObjectId// or any other type
  page: number;
  limit: number;
  name: string;
}

