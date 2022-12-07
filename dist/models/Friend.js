"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friend = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const friend_status_enum_1 = require("../constants/enums/friend-status.enum");
const friendSchema = new mongoose_1.default.Schema({
    from: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    to: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        enum: Object.values(friend_status_enum_1.FriendStatus),
    },
}, { timestamps: true });
exports.Friend = mongoose_1.default.model("Friend", friendSchema);
