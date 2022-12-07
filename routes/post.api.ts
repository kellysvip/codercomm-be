import express from "express";
import { body, param } from "express-validator";
import { createPost } from "../api/controllers/post/createPost";
import { deletePost } from "../api/controllers/post/deletePost";
import { getCommentsOfPost } from "../api/controllers/post/getCommentsOfPost";
import { getPosts } from "../api/controllers/post/getPosts";
import { getSinglePost } from "../api/controllers/post/getSinglePost";
import { updatePost } from "../api/controllers/post/updatePost";
import { loginRequired } from "../middlewares/authentication";
import { checkObjectId } from "../middlewares/checkObjectId";
import { validate } from "../middlewares/validators";
const router = express.Router();

/**
 * @route GET /posts/user/:userId?page=1&limit=10
 * @description Get all posts an user can see with pagination
 * @access Login required
 */
router.get(
  "/user/:userId",
  validate([param("userId").exists().isString().custom(checkObjectId)]),
  getPosts
);

/**
 * @route POST /posts
 * @description Create a new post
 * @body {content, image}
 * @access Login required
 */
router.post(
  "/",
  loginRequired,
  validate([body("content", "Missing content").exists().notEmpty()]),
  createPost
);

/**
 * @route DELETE /posts/:id
 * @description Delete a post
 * @access Login required
 */
router.delete("/:postId", loginRequired, deletePost);

/**
 * @route PUT /posts/:id
 * @description Update a post
 * @body {content, image}
 * @access Login required
 */

router.put(
  "/:postId",
  loginRequired,
  validate([
    body("content", "Missing content").exists(),
    param("postId").exists().isString().custom(checkObjectId),
  ]),
  updatePost
);

/**
 * @route GET /posts/:id
 * @description Get a single post
 * @access Login required
 */
router.get(
  "/:postId",
  loginRequired,
  validate([param("postId").exists().isString().custom(checkObjectId)]),
  getSinglePost
);

/**
 * @route GET /posts/:id/comments
 * @description Get comments of a post
 * @access Login required
 */
router.get(
  "/:postId/comments",
  loginRequired,
  validate([param("postId").exists().isString().custom(checkObjectId)]),
  getCommentsOfPost
);

export default router;
