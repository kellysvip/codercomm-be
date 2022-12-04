"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const saveReaction_1 = require("../api/controllers/reaction/saveReaction");
const checkObjectId_1 = require("../middlewares/checkObjectId");
const validators_1 = require("../middlewares/validators");
const router = express_1.default.Router();
/**
 * @route POST /reactions
 * @description Save a reaction to post or comment
 * @body {targetType: 'Post' or 'Comment', targetId, emoji}
 * @access Login required
 */
router.post("/", (0, validators_1.validate)([
    (0, express_validator_1.body)("targetType", "Invalid targetType").exists().isIn(["Post", "Comment"]),
    (0, express_validator_1.body)("targetId", "Invalid targetId").exists().custom(checkObjectId_1.checkObjectId),
    (0, express_validator_1.body)("emoji", "Invalid emoji").isIn(["like", "dislike"]),
]), saveReaction_1.saveReaction);
exports.default = router;
