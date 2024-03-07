import { Request, Response } from "express";
import { CreateAvionUsecase } from "../../appicaition/createAvionUseCase";
import { Avion } from "../../domina/avion";


export class CreateAvionController {
    constructor(readonly createAvionUsecase: CreateAvionUsecase) { }
    async run(req: Request, res: Response) {
        console.log('controller')

        try {

            let {name,model,capacity,airline} = req.body
            console.log(req.body)

            let posh = await this.createAvionUsecase.run(
                name,
                model,
                capacity,
                airline
            )
            if (posh instanceof Avion) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: posh.uuid,
                        name: posh.name,
                        model: posh.model,
                        capacity: posh.capacity,
                        airline: posh.airline
                    }
                })
            }
            else {
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred while register the avion."
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