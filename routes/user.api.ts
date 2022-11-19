import express from "express";
const router = express.Router();
import { createUser } from "../api/controllers/user/createUser";
import { body } from "express-validator";
import { validate } from "../middlewares/validators";



/**
 * @route POST /users
 * @description Register a new user
 * @body {name, email, password}
 * @access Public
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
