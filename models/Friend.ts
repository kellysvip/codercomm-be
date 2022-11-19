import mongoose from "mongoose";

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
      enum: ["pending", "accepted", "declined"],
    },
  },
  { timestamps: true }
);

export const Friend = mongoose.model("Friend", friendSchema);
