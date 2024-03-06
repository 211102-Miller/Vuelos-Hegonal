import express from "express";
import { createReservationController } from "../dependencies";

export const reservationRoute = express.Router();


reservationRoute.post("/", createReservationController.run.bind(createReservationController)); 