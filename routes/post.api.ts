import express from "express";
import { createPost } from "../api/controllers/post/createPost";
const router = express.Router();

/**
 * @route POST /posts
 * @description Create a new post
 * @body {content, image}
 * @access Login required
 */
 router.post("/", createPost)

/**
 * @route DELETE /posts/:id
 * @description Delete a post
 * @access Login required
 */

/**
 * @route PUT /posts
 * @description Update a post
 * @body {content, image}
 * @access Login required
 */

/**
 * @route GET /posts/:id
 * @description Get a single post
 * @access Login required
 */

/**
 * @route GET /posts/:id/comments
 * @description Get comments of a post
 * @access Login required
 */


export default router;
