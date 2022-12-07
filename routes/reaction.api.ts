import express from "express";
import { body } from "express-validator";
import { saveReaction } from "../api/controllers/reaction/saveReaction";
import { loginRequired } from "../middlewares/authentication";
import { checkObjectId } from "../middlewares/checkObjectId";
import { validate } from "../middlewares/validators";
const router = express.Router();

/**
 * @route POST /reactions
 * @description Save a reaction to post or comment
 * @body {targetType: 'Post' or 'Comment', targetId, emoji}
 * @access Login required
 */

router.post(
  "/",loginRequired,
  validate([
    body("targetType", "Invalid targetType").exists().isIn(["Post", "Comment"]),
    body("targetId", "Invalid targetId").exists().custom(checkObjectId),
    body("emoji", "Invalid emoji").isIn(["like", "dislike"]),
  ]),
  saveReaction
);

export default router;
