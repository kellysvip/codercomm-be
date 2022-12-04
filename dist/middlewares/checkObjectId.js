"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const checkObjectId = (paramId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(paramId)) {
        throw new Error("Invalid ObjectId");
    }
    return true;
};
exports.checkObjectId = checkObjectId;
