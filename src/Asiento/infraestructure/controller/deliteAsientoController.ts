import { Request, Response } from "express";
import { DeleteAsientoUseCase } from "../../appicaition/deliteAsientoUseCase";


export class DeliteAsientoController{
    constructor(readonly deleteAsientoUseCase: DeleteAsientoUseCase){}


    async run(req:Request,res:Response){
        try {

            let { uuid } = req.params;
        
            let UpdateById = await this.deleteAsientoUseCase.run(uuid)

            if(UpdateById){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        message: UpdateById
                    }
                })
            }
            else{
                return res.status(404).send({
                    status: "error",
                    message: " not found."
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
                message: "An error occurred while delete."
            });
        }
    }
}