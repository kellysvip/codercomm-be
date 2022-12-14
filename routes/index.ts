import express from "express";
export const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("Welcome to CoderSchool!");
});
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
