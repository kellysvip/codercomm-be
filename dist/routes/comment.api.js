"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const createComment_1 = require("../api/controllers/comment/createComment");
const deleteComment_1 = require("../api/controllers/comment/deleteComment");
const getSingleComment_1 = require("../api/controllers/comment/getSingleComment");
const updateComment_1 = require("../api/controllers/comment/updateComment");
const checkObjectId_1 = require("../middlewares/checkObjectId");
const validators_1 = require("../middlewares/validators");
const router = express_1.default.Router();
/**
 * @route POST /comments
 * @description Create a new comment
 * @body {content, postId}
 * @access Login required
 */
router.post("/", (0, validators_1.validate)([
    (0, express_validator_1.body)("content", "Missing content").exists().notEmpty(),
    (0, express_validator_1.body)("postId", "Missing postId").exists().isString().custom(checkObjectId_1.checkObjectId),
]), createComment_1.createComment);
/**
 * @route PUT /comments/:id
 * @description Update a comment
 * @access Login required
 */
router.put("/:id", (0, validators_1.validate)([
    (0, express_validator_1.body)("content", "Missing content").exists().notEmpty(),
    (0, express_validator_1.param)("id").exists().isString().custom(checkObjectId_1.checkObjectId),
]), updateComment_1.updateComment);
/**
 * @route DELETE /comments/:id
 * @description Delete a comment
 * @access Login required
 */
router.delete("/:id", (0, validators_1.validate)([
    (0, express_validator_1.param)("id").exists().isString().custom(checkObjectId_1.checkObjectId),
]), deleteComment_1.deleteComment);
/**
 * @route Get /comments/:id
 * @description Get details of a comment
 * @access Login required
 */
router.get("/:id", (0, validators_1.validate)([
    (0, express_validator_1.param)("id").exists().isString().custom(checkObjectId_1.checkObjectId),
]), getSingleComment_1.getSingleComment);
exports.default = router;
