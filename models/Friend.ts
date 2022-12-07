import mongoose from "mongoose";
import { FriendStatus } from "../constants/enums/friend-status.enum";
export interface IFriend {
  from: mongoose.Schema.Types.ObjectId;
  to: mongoose.Schema.Types.ObjectId;
  status: FriendStatus;
}
const friendSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: Object.values(FriendStatus),
    },
  },
  { timestamps: true }
);

export const Friend = mongoose.model("Friend", friendSchema);
