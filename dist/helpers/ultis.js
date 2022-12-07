"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = exports.catchAsync = exports.sendResponse = void 0;
function sendResponse(res, status, success, data, errors, message) {
    const response = {};
    if (success)
        response.success = success;
    if (data)
        response.data = data;
    if (errors)
        response.errors = errors;
    if (message)
        response.message = message;
    return res.status(status).json(response);
}
exports.sendResponse = sendResponse;
const catchAsync = (func) => (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
};
exports.catchAsync = catchAsync;
class AppError extends Error {
    constructor(statusCode, message, errorType) {
        super(message);
        // all errors using this class are operational errors.
        this.isOperational = true;
        this.statusCode = statusCode;
        this.errorType = errorType;
        // create a stack trace for debugging (Error obj, void obj to avoid stack polution)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
