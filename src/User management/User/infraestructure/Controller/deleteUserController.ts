import { DeleteUserUseCase } from "../../application/Usecase/deleteUserUseCase";
import { Request, Response } from "express";

export class DeleteUserController{
    constructor(readonly deleteUserUseCase:DeleteUserUseCase){}

    async run(req:Request, res:Response){
        try {
            let {uuid} = req.params;

            const  userDelete = await this.deleteUserUseCase.run(uuid);
             
            if(userDelete){
                return res.status(200).send({
                    data:{
                        userDelete
                    }                  
                })
            }else{
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