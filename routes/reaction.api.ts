import express from "express";
const router = express.Router();

/**
 * @route POST /reactions
 * @description Save a reaction to post or comment
 * @body {targetType: 'Post' or 'Comment', targetId, emoji}
 * @access Login required
 */

export default router;
