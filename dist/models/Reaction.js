"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reactionSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    targetType: {
        type: String,
        required: true,
        enum: ["Post", "Comment"],
    },
    targetId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        refPath: "targetType",
    },
    emoji: {
        type: String,
        required: true,
        enum: ["like", "dislike"],
    },
}, { timestamps: true });
exports.Reaction = mongoose_1.default.model("Reaction", reactionSchema);
