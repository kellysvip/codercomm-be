import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: true,
    },

    avatarUrl: {
      type: String,
      required: false,
      default: "",
    },
    coverUrl: {
      type: String,
      required: false,
      default: "",
    },

    aboutMe: {
      type: String,
      required: false,
      default: "",
    },
    city: {
      type: String,
      required: false,
      default: "",
    },
    country: {
      type: String,
      required: false,
      default: "",
    },
    company: {
      type: String,
      required: false,
      default: "",
    },
    jobTitle: {
      type: String,
      required: false,
      default: "",
    },
    facebookLink: {
      type: String,
      required: false,
      default: "",
    },
    instagramLink: {
      type: String,
      required: false,
      default: "",
    },
    linkedLink: {
      type: String,
      required: false,
      default: "",
    },
    twitterLink: {
      type: String,
      required: false,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },
    friendCount: {
      type: Number,
      default: 0,
    },
    postCount: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
