import { Request, Response } from "express";
import { CreateAsientoUsecase } from "../../appicaition/createAsientoUseCase";
import { Asiento } from "../../domina/asiento";


export class Createasientocontroller {
    constructor(readonly createAsientoUsecase: CreateAsientoUsecase) { }
    async run(req: Request, res: Response) {
        console.log('controller')

        try {

            let {name,type,description,avion_uuid} = req.body
            console.log(req.body)

            let posh = await this.createAsientoUsecase.run(
                name,
                type,
                description,
                avion_uuid
            )
            if (posh instanceof Asiento) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        id: posh.uuid,
                        name:posh.name,
                        type: posh.type,
                        description: posh.description,
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