"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveReaction = exports.calculateReactionCount = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ultis_1 = require("../../../helpers/ultis");
const Reaction_1 = require("../../../models/Reaction");
const calculateReactionCount = async (targetId, targetType) => {
    const stats = await Reaction_1.Reaction.aggregate([
        {
            $match: { targetId: new mongoose_1.Types.ObjectId(targetId) },
        },
        {
            $group: {
                _id: "$targetId",
                like: {
                    $sum: {
                        $cond: [{ $eq: ["$emoji", "like"] }, 1, 0],
                    },
                },
                dislike: {
                    $sum: {
                        $cond: [{ $eq: ["$emoji", "dislike"] }, 1, 0],
                    },
                },
            },
        },
    ]);
    const reactions = {
        like: (stats[0] && stats[0].like || 0),
        dislike: (stats[0] && stats[0].dislike) || 0
    };
    await mongoose_1.default.model(targetType).findByIdAndUpdate(targetId, { reactions });
    return reactions;
};
exports.calculateReactionCount = calculateReactionCount;
exports.saveReaction = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const currentUserId = "638106c7165bf365b93649ca"; //errorts  req.userId
    const { targetType, targetId, emoji } = req.body;
    // Check targetType exists
    const targetObj = await mongoose_1.default.model(targetType).findById(targetId);
    if (!targetObj)
        throw new ultis_1.AppError(400, `${targetType} not found`, "Create Reaction Error");
    // Find the reaction if exists
    let reaction = await Reaction_1.Reaction.findOne({
        targetType,
        targetId,
        author: currentUserId,
    });
    // If there is no reaction in the DB ->Create a new one
    if (!reaction) {
        reaction = await Reaction_1.Reaction.create({
            targetType,
            targetId,
            author: currentUserId,
            emoji,
        });
    }
    else {
        // If there is ap revious reaction on the DB -> compare the emoji
        if (reaction.emoji === emoji) {
            // If they are the same -> delete the reaction
            await reaction.delete();
        }
        else {
            // If they are different -> update the reactio
            reaction.emoji = emoji;
            await reaction.save();
        }
    }
    const reactions = await (0, exports.calculateReactionCount)(targetId, targetType);
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { reactions }, null, "Save Reaction Success");
});
