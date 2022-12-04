"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_1 = require("../../../models/User");
const ultis_1 = require("../../../helpers/ultis");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.createUser = (0, ultis_1.catchAsync)(async (req, res, next) => {
    //get data from request
    let { name, email, password } = req.body;
    console.log(name, email, password);
    //Validation
    let user = (await User_1.User.findOne({ email }));
    if (user)
        throw new ultis_1.AppError(400, "UserId already exists", "Register Error");
    //Process
    const salt = await bcryptjs_1.default.genSalt(10);
    password = await bcryptjs_1.default.hash(password, salt);
    user = (await User_1.User.create({ name, email, password }));
    const accessToken = await user.generateToken();
    //Response
    (0, ultis_1.sendResponse)(res, 200, true, { user, accessToken }, null, "Create User Success");
});
