"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_SECRET_KEY = "dkhfgfdgdfhfdjgdf";
const ultis_1 = require("../helpers/ultis");
const loginRequired = (req, res, next) => {
    try {
        const tokenString = req.headers["www-authenticate"];
        console.log(tokenString);
        if (!tokenString)
            throw new ultis_1.AppError(401, "Login Required", "Authentication Error");
        const token = tokenString.replace("Bearer ", "");
        jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    throw new ultis_1.AppError(401, "Token Expired", "Authentication Error");
                }
                else {
                    throw new ultis_1.AppError(401, "Token is Invalid", "Authentication Error");
                }
            }
            const payload = decoded;
            console.log(payload._id);
            req.userId = payload._id;
        });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.loginRequired = loginRequired;
