import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    targetType: {
      type: String,
      required: true,
      enum: ["Post", "Comment"],
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "targetType",
    },
    emoji: {
      type: String,
      required: true,
      enum: ["like", "dislike"],
    },
  },
  { timestamps: true }
);

export const Reaction = mongoose.model("Reaction", reactionSchema);
