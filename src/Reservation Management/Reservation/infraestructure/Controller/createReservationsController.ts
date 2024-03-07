import { Request, Response } from "express";
import { CreateReservationsUseCase } from "../../application/UseCase/createReservationsUseCase";

export class CreateReservationsController {
    constructor(readonly createReservationsUseCase: CreateReservationsUseCase) {}

    async run(req: Request, res: Response) {
        try {
            const {
                uuidUser,
                uuidAsiento,
                uuidVueloIda,
                uuidVueloRegreso,
                typeVuelo,
                typeEquipaje,
                acompanantes
            } = req.body;

            const userReservationData = {
                uuidUser,
                uuidAsiento,
                uuidVueloIda,
                uuidVueloRegreso,
                typeVuelo,
                typeEquipaje
            };

            const reservations = await this.createReservationsUseCase.run(userReservationData, acompanantes);

            if (reservations) {
                return res.status(201).send({
                    status: "success",
                    reservations
                });
            } else {
                return res.status(404).send({
                    status: "error",
                    message: "Error creating the Reservation."
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: "error",
                message: "An error occurred while creating the reservation."
            });
        }
    }
}
