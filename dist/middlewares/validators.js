"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ultis_1 = require("../helpers/ultis");
const express_validator_1 = require("express-validator");
const validate = (validationArray) => async (req, res, next) => {
    await Promise.all(validationArray.map((validation) => validation.run(req)));
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty())
        return next();
    const message = errors
        .array()
        .map((error) => error.msg)
        .join(" & ");
    return (0, ultis_1.sendResponse)(res, 422, false, { message }, null, "Validator Error");
};
exports.validate = validate;
