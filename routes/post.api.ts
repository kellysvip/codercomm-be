import express from "express";
import { body, param } from "express-validator";
import { createPost } from "../api/controllers/post/createPost";
import { deletePost } from "../api/controllers/post/deletePost";
import { getPosts } from "../api/controllers/post/getPosts";
import { getSinglePost } from "../api/controllers/post/getSinglePost";
import { updatePost } from "../api/controllers/post/updatePost";
import { checkObjectId } from "../middlewares/checkObjectId";
import { validate } from "../middlewares/validators";
const router = express.Router();

/**
 * @route GET /posts/user/:userId?page=1&limit=10
 * @description Get all posts an user can see with pagination
 * @access Login required
 */
 router.get("/user/:userId", validate([param("userId").exists().isString().custom(checkObjectId)]), getPosts)

/**
 * @route POST /posts
 * @description Create a new post
 * @body {content, image}
 * @access Login required
 */
 router.post("/",validate([body("content", "Missing content").exists().notEmpty()]) ,createPost)

/**
 * @route DELETE /posts/:id
 * @description Delete a post
 * @access Login required
 */
 router.delete("/:id",validate([body("content", "Missing content").exists().notEmpty()]) ,deletePost)

/**
 * @route PUT /posts
 * @description Update a post
 * @body {content, image}
 * @access Login required
 */

 router.put("/:id",validate([body("content", "Missing content").exists().notEmpty()]) ,updatePost)

/**
 * @route GET /posts/:id
 * @description Get a single post
 * @access Login required
 */
router.get("/:id", validate([param("id").exists().isString().custom(checkObjectId)]), getSinglePost)

/**
 * @route GET /posts/:id/comments
 * @description Get comments of a post
 * @access Login required
 */


export default router;
