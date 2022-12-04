"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "hdfgjhd";
const userSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
userSchema.methods.toJSON = function () {
    const user = this._doc;
    delete user.password;
    delete user.isDeleted;
    return user;
};
userSchema.methods.map = function () {
    const user = this._doc;
    return user;
};
userSchema.method("generateToken", async function generateToken() {
    const accessToken = await jsonwebtoken_1.default.sign({ _id: this._id }, JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    return accessToken;
});
exports.User = mongoose_1.default.model("User", userSchema);
