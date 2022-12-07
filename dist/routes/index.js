"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
/* GET home page. */
router.get("/", function (req, res, next) {
    res.status(200).send({ status: "ok", data: "Hello" });
});
// authApi
const auth_api_1 = __importDefault(require("./auth.api"));
router.use('/auth', auth_api_1.default);
// userApi
const user_api_1 = __importDefault(require("./user.api"));
router.use('/users', user_api_1.default);
// postuserApi
const post_api_1 = __importDefault(require("./post.api"));
router.use('/posts', post_api_1.default);
// commentApi
const comment_api_1 = __importDefault(require("./comment.api"));
router.use('/comments', comment_api_1.default);
// reactionApi
const reaction_api_1 = __importDefault(require("./reaction.api"));
router.use('/reactions', reaction_api_1.default);
// friendApi
const friend_api_1 = __importDefault(require("./friend.api"));
router.use('/friends', friend_api_1.default);
/**
* @route POST /auth/login Log in with username and password

* @route POST /users Register a new account
* @route GET /users?page=1&timit-10 Get users with pagination
* @route GET /users/me- Get current user into
* @route GET /users/:id - Get a user profile
* @route PUT /users/:id - Update a user profile


* @route POST /posts - Create a new post
* @route GET /posts/user/:userId?page=1&limit=10- Get posts with pagination
* @route GET /posts/:id - Get details of a post
* @route PUT /posts/:id - Update a post
* @route DELETE /posts/:id - Remove a post
* @route GET /posts/:id/comments/ - Get List of comments of a post

* @route POST /comments - Create a new comment
* @route PUT /comments/:id - Update comment
* @route DELETE /comments/:id - Delete comment

* @route POST /reactions - Create a new emoji reaction for a post/comment

* @route POST /friends/requests - Send a friend request
* @route GET /friends/requests/incoming - Get the list of received pending requests
* @route GET /friends/requests/outgoing - Get the list of sent pending requests
* @route PUT /friends/requests/:userId - Accept/Reject a received pending requests
* @route GET /friends - Get the list of friends
* @route DELETE /friends/requests/:userId - Cancel a friend request
* @route DELETE /friends/:userId- Remove a friend
*/
