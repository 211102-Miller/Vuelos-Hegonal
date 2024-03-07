import { Request, Response } from "express";
import { GetByIdUseCase } from "../../appicaition/getidAsientoUsecase";

export class GetByIdCoontroller{
    constructor(readonly getByIdUseCase:GetByIdUseCase){}

    async run(req:Request, res:Response) {
        try {

            let { uuid } = req.params;
            console.log(uuid)
            let getByuuid = await this.getByIdUseCase.run(uuid as string)

            if(getByuuid){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        user: getByuuid
                    }
                })
            }else{
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
                message: "An error occurred while get "
            });   
        }
    }
}