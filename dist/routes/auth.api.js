"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const loginWithEmail_1 = require("../api/controllers/auth/loginWithEmail");
const express_validator_1 = require("express-validator");
const validators_1 = require("../middlewares/validators");
/**
 * @route POST /auth/login
 * @description Login with email and password
 * @body {email, password}
 * @access Login required
 */
router.post("/login", (0, validators_1.validate)([
    (0, express_validator_1.body)("email", "Invalid email")
        .exists()
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: false }),
    (0, express_validator_1.body)("password", "Invalid password").exists().notEmpty(),
]), loginWithEmail_1.loginWithEmail);
exports.default = router;
