import { Request,Response } from "express";
import { UpdateAsientoByIdUseCase } from "../../appicaition/updateAsientoUsecase";

export class UpdateAsientocontroller{
    constructor( readonly updateAsientoByIdUseCase:UpdateAsientoByIdUseCase){}

    async run(req:Request, res:Response) {
        try {
            let { uuid } = req.params;

            let {
                type,
              
            } = req.body
        
            let UpdateById = await this.updateAsientoByIdUseCase.update(uuid,type)

            if(UpdateById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        update_user: UpdateById
                    }
                })
            }else{
                return res.status(404).send({
                    status: "error",
                    message: " not found "
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
                message: "An error occurred while update."
            });   
        }
    }
}