"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.post("/", dependencies_1.registerUserController.run.bind(dependencies_1.registerUserController));
exports.UserRouter.post("/login", dependencies_1.loginUserController.run.bind(dependencies_1.loginUserController));
exports.UserRouter.put("/", dependencies_1.updateUserController.run.bind(dependencies_1.updateUserController));
exports.UserRouter.delete("/:uuid", dependencies_1.deleteUserController.run.bind(dependencies_1.deleteUserController));
