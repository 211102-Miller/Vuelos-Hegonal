"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const depencies_1 = require("./depencies");
exports.AvionRoutes = express_1.default.Router();
exports.AvionRoutes.post("/", depencies_1.createvuelocontroller.run.bind(depencies_1.createvuelocontroller));
exports.AvionRoutes.get("/", depencies_1.getAllVueloController.run.bind(depencies_1.getAllVueloController));
exports.AvionRoutes.get("/:uuid", depencies_1.getByIdCoontroller.run.bind(depencies_1.getByIdCoontroller));
exports.AvionRoutes.put("/:uuid", depencies_1.updateAvioncontroller.run.bind(depencies_1.updateAvioncontroller));
exports.AvionRoutes.delete("/:uuid", depencies_1.deleteAvionUseCase.run.bind(depencies_1.deleteAvionUseCase));
