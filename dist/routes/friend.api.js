"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const cancelFriendRequest_1 = require("../api/controllers/friend/cancelFriendRequest");
const getFriendList_1 = require("../api/controllers/friend/getFriendList");
const getReceivedFriendRequestList_1 = require("../api/controllers/friend/getReceivedFriendRequestList");
const getSentFriendRequestList_1 = require("../api/controllers/friend/getSentFriendRequestList");
const reactFriendRequest_1 = require("../api/controllers/friend/reactFriendRequest");
const removeFriend_1 = require("../api/controllers/friend/removeFriend");
const sendFriendRequest_1 = require("../api/controllers/friend/sendFriendRequest");
const checkObjectId_1 = require("../middlewares/checkObjectId");
const validators_1 = require("../middlewares/validators");
const router = express_1.default.Router();
/**
 * @route POST /friends/requests
 * @description Send a new friend request
 * @body {to: User ID}
 * @access Login required
 */
router.post("/requests", (0, validators_1.validate)([
    (0, express_validator_1.body)("to").exists().isString().custom(checkObjectId_1.checkObjectId)
]), sendFriendRequest_1.sendFriendRequest);
/**
 * @route GET /friends/requests/incoming
 * @description Get the list of sent pending requests
 * @access Login required
 */
router.get("/requests/incoming", getReceivedFriendRequestList_1.getReceivedFriendRequestList);
/**
 * @route GET /friends/requests/outgoing
 * @description Get the list of received pending requests
 * @access Login required
 */
router.get("/requests/outgoing", getSentFriendRequestList_1.getSentFriendRequestList);
/**
 * @route GET /friends
 * @description Get the list of friends
 * @access Login required
 */
router.get("/requests", getFriendList_1.getFriendList);
/**
 * @route PUT /friends/requests/:userId
 * @description Acept/Reject a received pending requests
 * @body {ststus: 'acepted' or 'decline}
 * @access Login required
 */
router.put("/requests/:userId", (0, validators_1.validate)([
    (0, express_validator_1.body)("status").exists().isString().isIn(["accepted", "declined"]),
    (0, express_validator_1.param)("userId").exists().isString().custom(checkObjectId_1.checkObjectId)
]), reactFriendRequest_1.reactFriendRequest);
/**
 * @route DELETE /friends/requests/:userId
 * @description Cancel friend request
 * @access Login required
 */
router.delete("/requests/:userId", (0, validators_1.validate)([
    (0, express_validator_1.param)("userId").exists().isString().custom(checkObjectId_1.checkObjectId)
]), cancelFriendRequest_1.cancelFriendRequest);
/**
 * @route DELETE /friends/:userId
 * @description Remove a friend
 * @access Login required
 */
router.delete("/:userId", (0, validators_1.validate)([
    (0, express_validator_1.param)("userId").exists().isString().custom(checkObjectId_1.checkObjectId)
]), removeFriend_1.removeFriend);
exports.default = router;
