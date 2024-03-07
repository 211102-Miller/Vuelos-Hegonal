"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsientoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const depencies_1 = require("./depencies");
exports.AsientoRoutes = express_1.default.Router();
exports.AsientoRoutes.post("/", depencies_1.createAsientocontroller.run.bind(depencies_1.createAsientocontroller));
exports.AsientoRoutes.get("/", depencies_1.getAllAsientoController.run.bind(depencies_1.getAllAsientoController));
exports.AsientoRoutes.get("/:uuid", depencies_1.getByIdCoontroller.run.bind(depencies_1.getByIdCoontroller));
exports.AsientoRoutes.put("/:uuid", depencies_1.updateAsientocontroller.run.bind(depencies_1.updateAsientocontroller));
exports.AsientoRoutes.delete("/:uuid", depencies_1.deleteAsientoUseCase.run.bind(depencies_1.deleteAsientoUseCase));
