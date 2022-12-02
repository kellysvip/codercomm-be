import express from "express";
const router = express.Router();
import { loginWithEmail } from "../api/controllers/auth/loginWithEmail";
import { body } from "express-validator";
import { validate } from "../middlewares/validators";
import { loginRequired } from "../middlewares/authentication";

/**
 * @route POST /auth/login
 * @description Login with email and password
 * @body {email, password}
 * @access Login required
 */

router.post(
  "/login",
  validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  
  loginWithEmail
);

export default router;
