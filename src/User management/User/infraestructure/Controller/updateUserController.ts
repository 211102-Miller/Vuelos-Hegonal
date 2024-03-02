import { UpdateUserUseCase } from "../../application/Usecase/updateUserUseCase";
import { Request, Response } from "express";
import { User } from "../../domain/Entity/User";


export class UpdateUserController{
    constructor(readonly updateUserUseCase:UpdateUserUseCase){}

    async run(req:Request, res:Response){
        try {
            const {uuid, name, lastName, cellphone} = req.body;

            const updateContact = {name,lastName,cellphone}

            const  update = await this.updateUserUseCase.run(uuid, updateContact);


            if (update) {
                return res.status(201).send({
                    update,
                })
            }
            else {
                return res.status(404).send({
                    stauts: "Error"
                })
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
                message: "An error occurred while delete the user."
            });
        }
    }
}