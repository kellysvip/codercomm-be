import express from "express";
const router = express.Router();

/**
 * @route POST /friends/requests
 * @description Send a new friend request
 * @body {to: User ID}
 * @access Login required
 */

/**
 * @route GET /friends/requests/incoming
 * @description Get the list of sent pending requests
 * @access Login required
 */

/**
 * @route GET /friends/requests/outgoing
 * @description Get the list of received pending requests
 * @access Login required
 */

/**
 * @route GET /friends
 * @description Get the list of friends
 * @access Login required
 */

/**
 * @route PUT /friends/requests/:userId
 * @description Acept/Reject a received pending requests
 * @body {ststus: 'acepted' or 'decline} 
 * @access Login required
 */

/**
 * @route DELETE /friends/requests/:userId
 * @description Cancle friend request
 * @access Login required
 */

/**
 * @route DELETE /friends/:userId
 * @description Remove a friend
 * @access Login required
 */


export default router;
