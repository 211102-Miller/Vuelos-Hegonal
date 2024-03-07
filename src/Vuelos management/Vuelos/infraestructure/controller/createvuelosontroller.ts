import { Request, Response } from "express";
import { CreateVuelosUsecase } from "../../appicaition/createVuelosUseCase";
import { Vuelos } from "../../domina/vuelos";


export class CreateVuelosController {
    constructor(readonly createVuelosUsecase: CreateVuelosUsecase) { }
    async run(req: Request, res: Response) {

        try {

            let {origin,destination,state,city,date_init,date_end,price,status,avion_uuid} = req.body
            console.log(req.body)

            let posh = await this.createVuelosUsecase.run(
                origin,
                destination,
                state,
                city,date_init,date_end,price,status,avion_uuid
            )
            if (posh instanceof Vuelos) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: posh.uuid,
                        origin:posh.origin,
                        destination: posh.destination,
                        state: posh.state,
                        city: posh.avion_uuid,
                        date_init: posh.date_init,
                        date_end: posh.date_end,
                        price: posh.price,
                        status: posh.status,
                        avion_uuid: posh.avion_uuid
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register"
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({
                    status: "error",
                    message: "Validation failed",
                    errors: JSON.parse(error.message)  
                });
            }

            return res.status(500).send({
                status: "error",
                message: "An unexpected error occurred. Please try again later.",
            });
        }
    }
}