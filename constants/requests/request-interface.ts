import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
  userId: string | null// or any other type
  page: number | 1;
  limit: number | 10;
  name: string;
}

export interface IGetPostInfoRequest extends Request {
  userId: string | null// or any other type
  page: number | 1;
  limit: number | 10;
  name: string;
}