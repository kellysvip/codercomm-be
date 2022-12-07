"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false,
    },
    commentCount: {
        type: Number,
        default: 0,
    },
    reactions: {
        like: { type: Number, default: 0 },
        dislike: { type: Number, default: 0 },
    },
}, { timestamps: true });
postSchema.methods.toJSON = function () {
    const post = this._doc;
    delete post.isDeleted;
    return post;
};
exports.Post = mongoose_1.default.model("Post", postSchema);
