"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueloRoutes = void 0;
const express_1 = __importDefault(require("express"));
const depencies_1 = require("./depencies");
exports.VueloRoutes = express_1.default.Router();
exports.VueloRoutes.post("/", depencies_1.createvuelocontroller.run.bind(depencies_1.createvuelocontroller));
exports.VueloRoutes.get("/", depencies_1.getAllVueloController.run.bind(depencies_1.getAllVueloController));
exports.VueloRoutes.get("/:uuid", depencies_1.getByIdCoontroller.run.bind(depencies_1.getByIdCoontroller));
exports.VueloRoutes.put("/:uuid", depencies_1.updateAvioncontroller.run.bind(depencies_1.updateAvioncontroller));
exports.VueloRoutes.delete("/:uuid", depencies_1.deleteAvionUseCase.run.bind(depencies_1.deleteAvionUseCase));
