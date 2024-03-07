import express from "express";
import { createReservationController,createReservationsController } from "../dependencies";


export const reservationRoute = express.Router();


reservationRoute.post("/", createReservationController.run.bind(createReservationController)); 
reservationRoute.post("/acompanante", createReservationsController.run.bind(createReservationsController)); 
