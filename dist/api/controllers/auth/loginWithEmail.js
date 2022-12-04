"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithEmail = void 0;
const ultis_1 = require("../../../helpers/ultis");
const User_1 = require("../../../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.loginWithEmail = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    const { email, password } = req.body;
    //Validation
    let user = await User_1.User.findOne({ email }, "+password");
    if (!user)
        throw new ultis_1.AppError(400, "Invalid Credentials", "Login Error");
    //Process
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new ultis_1.AppError(400, "Wrong Password", "Login Error");
    const accessToken = await user.generateToken();
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { user, accessToken }, null, "Login Success");
});
