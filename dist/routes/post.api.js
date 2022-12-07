"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const createPost_1 = require("../api/controllers/post/createPost");
const deletePost_1 = require("../api/controllers/post/deletePost");
const getCommentsOfPost_1 = require("../api/controllers/post/getCommentsOfPost");
const getPosts_1 = require("../api/controllers/post/getPosts");
const getSinglePost_1 = require("../api/controllers/post/getSinglePost");
const updatePost_1 = require("../api/controllers/post/updatePost");
const checkObjectId_1 = require("../middlewares/checkObjectId");
const validators_1 = require("../middlewares/validators");
const router = express_1.default.Router();
/**
 * @route GET /posts/user/:userId?page=1&limit=10
 * @description Get all posts an user can see with pagination
 * @access Login required
 */
router.get("/user/:userId", (0, validators_1.validate)([(0, express_validator_1.param)("userId").exists().isString().custom(checkObjectId_1.checkObjectId)]), getPosts_1.getPosts);
/**
 * @route POST /posts
 * @description Create a new post
 * @body {content, image}
 * @access Login required
 */
router.post("/", (0, validators_1.validate)([(0, express_validator_1.body)("content", "Missing content").exists().notEmpty()]), createPost_1.createPost);
/**
 * @route DELETE /posts/:id
 * @description Delete a post
 * @access Login required
 */
router.delete("/:id", (0, validators_1.validate)([(0, express_validator_1.body)("content", "Missing content").exists().notEmpty()]), deletePost_1.deletePost);
/**
 * @route PUT /posts
 * @description Update a post
 * @body {content, image}
 * @access Login required
 */
router.put("/:id", (0, validators_1.validate)([(0, express_validator_1.body)("content", "Missing content").exists().notEmpty()]), updatePost_1.updatePost);
/**
 * @route GET /posts/:id
 * @description Get a single post
 * @access Login required
 */
router.get("/:id", (0, validators_1.validate)([(0, express_validator_1.param)("id").exists().isString().custom(checkObjectId_1.checkObjectId)]), getSinglePost_1.getSinglePost);
/**
 * @route GET /posts/:id/comments
 * @description Get comments of a post
 * @access Login required
 */
router.get("/:id/comments", (0, validators_1.validate)([(0, express_validator_1.param)("id").exists().isString().custom(checkObjectId_1.checkObjectId)]), getCommentsOfPost_1.getCommentsOfPost);
exports.default = router;
