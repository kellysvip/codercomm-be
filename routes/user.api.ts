import express from "express";
import { createUser } from "../api/controllers/user/createUser";
const router = express.Router();
import { body } from "express-validator";
import { validate } from "../middlewares/validators";


/**
 * @route POST /auth/login
 * @description Login with email and password
 * @body {email, password}
 * @access Login required
 */

router.post(
    "/",
//   validate([
//     body("name", "Invalid name").exists().notEmpty(),
//     body("email", "Invalid email")
//       .exists()
//       .isEmail()
//       .normalizeEmail({ gmail_remove_dots: false }),
//     body("password", "Invalid password").exists().notEmpty(),
//   ]),

  createUser
);

export default router;
