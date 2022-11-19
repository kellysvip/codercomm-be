import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const JWT_SECRET_KEY: string = "ygsdfjksgf67f3";

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
      required: true,
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

userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  delete user.isDeleted;
  return user;
};

// userSchema.method("toJSON",  function toJSON() {
//   const user = this._doc;
//   delete user.password;
//   delete user.isDeleted;
//   return user;
// });

userSchema.method("generateToken", async function generateToken() {
  const accessToken: string = await jwt.sign(
    { _id: this._id },
    JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
  return accessToken;
});

export const User = mongoose.model("User", userSchema);
