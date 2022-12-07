import express from "express";
const router = express.Router();
import { createUser } from "../api/controllers/user/createUser";
import { body, param } from "express-validator";
import { validate } from "../middlewares/validators";
import { getUsers } from "../api/controllers/user/getUsers";
import { getCurrentUser } from "../api/controllers/user/getCurrentUser";
import { getSingleUser } from "../api/controllers/user/getSingleUser";
import { updateProfile } from "../api/controllers/user/updateProfile";
import { loginRequired } from "../middlewares/authentication";
import { checkObjectId } from "../middlewares/checkObjectId";

/**
 * @route POST /users
 * @description Register a new user
 * @body {name, email, password}
 * @access Login required
 */
router.post(
  "/",
  loginRequired,
  validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  createUser
);

/**
 * @route GET /users?page=1&limit=10
 * @description Get a user with paginations
 * @access Login required
 */

router.get("/", loginRequired, getUsers);

/**
 * @route GET /users/me
 * @description Get current user info
 * @access Login required
 */

router.get("/me", loginRequired, getCurrentUser);

/**
 * @route GET /users/:id
 * @description Get current user info
 * @access Login required
 */

router.get(
  "/:userId",
  loginRequired,
  validate([param("userId").exists().isString().custom(checkObjectId)]),
  getSingleUser
);

/**
 * @route PUT /users/:id
 * @description Update a user profile
 * @body {name, avatarUrl, coverUrl, aboutMe, city, country, company, jobTitle, facebookLink,...}
 * @access Login required
 */

router.put(
  "/:userId",
  loginRequired,
  validate([param("userId").exists().isString().custom(checkObjectId)]),
  updateProfile
);

/**
 * @route DELETE /users/:id
 * @description Delete a user
 * @access Login required
 */

export default router;
