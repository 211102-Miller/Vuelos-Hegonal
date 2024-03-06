import { Request, Response } from "express";
import { CreateReservationUseCase } from "../../application/UseCase/createReservationUseCase";


export class CreateReservationController{
    constructor(readonly createReservationUseCase:CreateReservationUseCase){}

    async run(req:Request, res:Response){
        try {
            let {
                uuidUser,
                uuidAsiento,
                uuidVueloIda,
                uuidVueloRegreso,
                typeVuelo,
                typeEquipaje
            } = req.body
            
            const dataUser = {uuidUser,uuidAsiento,uuidVueloIda,uuidVueloRegreso,typeVuelo,typeEquipaje};
            
            const post = await this.createReservationUseCase.run(dataUser);

            if (post) {
                return res.status(201).send({
                    status: "succes",
                    post
                });
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "Error create the Reservation."
                });
            }
            
            
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while create the user."
            });
        }
    }
}