"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Post",
    },
    reactions: {
        like: { type: Number, default: 0 },
        dislike: { type: Number, default: 0 },
    },
}, { timestamps: true });
exports.Comment = mongoose_1.default.model("Comment", commentSchema);