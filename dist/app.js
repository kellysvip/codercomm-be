"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// const indexRouter = require("./routes/index");
const index_1 = __importDefault(require("./routes/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const ultis_1 = require("./helpers/ultis");
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Connect to MONGODB
const mongoURI = process.env.MONGODB_URI ||
    "mongodb+srv://admin:admin@cluster0.t244bsh.mongodb.net/coder_comm";
mongoose_1.default
    .connect(mongoURI)
    .then(async () => console.log(`DB connected ${mongoURI}`))
    .catch((err) => console.log(err));
//Error Handler
app.use((err, req, res, next) => {
    // const err = createHttpError(httpStatus.NOT_FOUND, 'Not Found')
    err.statusCode = 404;
    ;
    err.message = "Not Found";
    next(err);
});
app.use((err, req, res, next) => {
    console.log("ERROR", err);
    if (err.isOperational) {
        return (0, ultis_1.sendResponse)(res, err.statusCode ? err.statusCode : 500, false, { message: err.message }, null, err.errorType);
    }
    else {
        return (0, ultis_1.sendResponse)(res, err.statusCode ? err.statusCode : 500, false, { message: err.message }, null, "Internal Server Error");
    }
});
app.use("/api", index_1.default);
exports.default = app;
module.exports = app;
function createError(arg0, arg1) {
    throw new Error("Function not implemented.");
}
