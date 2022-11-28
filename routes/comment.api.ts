import express from "express";
import { body, param } from "express-validator";
import { createComment } from "../api/controllers/comment/createComment";
import { deleteComment } from "../api/controllers/comment/deleteComment";
import { getSingleComment } from "../api/controllers/comment/getSingleComment";
import { updateComment } from "../api/controllers/comment/updateComment";
import { checkObjectId } from "../middlewares/checkObjectId";
import { validate } from "../middlewares/validators";
const router = express.Router();

/**
 * @route POST /comments
 * @description Create a new comment
 * @body {content, postId}
 * @access Login required
 */

router.post(
  "/",
  validate([
    body("content", "Missing content").exists().notEmpty(),
    body("postId", "Missing postId").exists().isString().custom(checkObjectId),
  ]),
  createComment
);

/**
 * @route PUT /comments/:id
 * @description Update a comment
 * @access Login required
 */

 router.put(
    "/:id",
    validate([
      body("content", "Missing content").exists().notEmpty(),
      param("id").exists().isString().custom(checkObjectId),
    ]),
    updateComment
  );

/**
 * @route DELETE /comments/:id
 * @description Delete a comment
 * @access Login required
 */
 router.delete(
    "/:id",
    validate([
      param("id").exists().isString().custom(checkObjectId),
    ]),
    deleteComment
  );

/**
 * @route Get /comments/:id
 * @description Get details of a comment
 * @access Login required
 */

router.get("/:id", validate([
    param("id").exists().isString().custom(checkObjectId),
  ]),
  getSingleComment)

export default router;
