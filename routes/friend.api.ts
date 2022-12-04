import express from "express";
import { body, param } from "express-validator";
import { cancelFriendRequest } from "../api/controllers/friend/cancelFriendRequest";
import { getFriendList } from "../api/controllers/friend/getFriendList";
import { getReceivedFriendRequestList } from "../api/controllers/friend/getReceivedFriendRequestList";
import { getSentFriendRequestList } from "../api/controllers/friend/getSentFriendRequestList";
import { reactFriendRequest } from "../api/controllers/friend/reactFriendRequest";
import { removeFriend } from "../api/controllers/friend/removeFriend";
import { sendFriendRequest } from "../api/controllers/friend/sendFriendRequest";
import { loginRequired } from "../middlewares/authentication";
import { checkObjectId } from "../middlewares/checkObjectId";
import { validate } from "../middlewares/validators";
const router = express.Router();

/**
 * @route POST /friends/requests
 * @description Send a new friend request
 * @body {to: User ID}
 * @access Login required
 */
 router.post("/requests", loginRequired,validate([
    body("to").exists().isString().custom(checkObjectId)
 ]), sendFriendRequest)

/**
 * @route GET /friends/requests/incoming
 * @description Get the list of sent pending requests
 * @access Login required
 */

 router.get("/requests/incoming",loginRequired, getReceivedFriendRequestList)

/**
 * @route GET /friends/requests/outgoing
 * @description Get the list of received pending requests
 * @access Login required
 */

 router.get("/requests/outgoing",loginRequired, getSentFriendRequestList)


/**
 * @route GET /friends
 * @description Get the list of friends
 * @access Login required
 */

 router.get("/requests",loginRequired, getFriendList)


/**
 * @route PUT /friends/requests/:userId
 * @description Acept/Reject a received pending requests
 * @body {ststus: 'acepted' or 'decline} 
 * @access Login required
 */
 router.put("/requests/:userId",loginRequired, validate([
    body("status").exists().isString().isIn(["accepted", "declined"]),
    param("userId").exists().isString().custom(checkObjectId)
 ]), reactFriendRequest)


/**
 * @route DELETE /friends/requests/:userId
 * @description Cancel friend request
 * @access Login required
 */

 router.delete("/requests/:userId",loginRequired, validate([
    param("userId").exists().isString().custom(checkObjectId)
 ]), cancelFriendRequest)


/**
 * @route DELETE /friends/:userId
 * @description Remove a friend
 * @access Login required
 */
 router.delete("/:userId",loginRequired, validate([
    param("userId").exists().isString().custom(checkObjectId)
 ]), removeFriend)


export default router;
