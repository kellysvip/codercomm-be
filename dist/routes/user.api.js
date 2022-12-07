"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const createUser_1 = require("../api/controllers/user/createUser");
const express_validator_1 = require("express-validator");
const validators_1 = require("../middlewares/validators");
const getUsers_1 = require("../api/controllers/user/getUsers");
const getCurrentUser_1 = require("../api/controllers/user/getCurrentUser");
const getSingleUser_1 = require("../api/controllers/user/getSingleUser");
const updateProfile_1 = require("../api/controllers/user/updateProfile");
const checkObjectId_1 = require("../middlewares/checkObjectId");
/**
 * @route POST /users
 * @description Register a new user
 * @body {name, email, password}
 * @access Login required
 */
router.post("/", (0, validators_1.validate)([
    (0, express_validator_1.body)("name", "Invalid name").exists().notEmpty(),
    (0, express_validator_1.body)("email", "Invalid email")
        .exists()
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: false }),
    (0, express_validator_1.body)("password", "Invalid password").exists().notEmpty(),
]), createUser_1.createUser);
/**
 * @route GET /users?page=1&limit=10
 * @description Get a user with paginations
 * @access Login required
 */
router.get("/", 
// loginRequired,
getUsers_1.getUsers);
/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */
router.get("/me", 
// loginRequired,
getCurrentUser_1.getCurrentUser);
/**
 * @route GET /users/:id
 * @description Get current user info
 * @access Login required
 */
router.get("/:id", (0, validators_1.validate)([(0, express_validator_1.param)("id").exists().isString().custom(checkObjectId_1.checkObjectId)]), getSingleUser_1.getSingleUser);
/**
 * @route PUT /users/:id
 * @description Update a user profile
 * @body {name, avatarUrl, coverUrl, aboutMe, city, country, company, jobTitle, facebookLink,...}
 * @access Login required
 */
router.put("/:id", (0, validators_1.validate)([(0, express_validator_1.param)("id").exists().isString().custom(checkObjectId_1.checkObjectId)]), updateProfile_1.updateProfile);
/**
 * @route DELETE /users/:id
 * @description Delete a user
 * @access Login required
 */
exports.default = router;
