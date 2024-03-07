"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationRoute = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies");
exports.reservationRoute = express_1.default.Router();
exports.reservationRoute.post("/", dependencies_1.createReservationController.run.bind(dependencies_1.createReservationController));
exports.reservationRoute.post("/acompanante", dependencies_1.createReservationsController.run.bind(dependencies_1.createReservationsController));
