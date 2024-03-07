import { Request, Response } from "express";
import { GetAllAvionUseCase } from "../../appicaition/getallAvionUsecase";


export class GetAllAvionController{
    constructor(private getAllAvionUseCase: GetAllAvionUseCase){};


    async run(req:Request, res:Response){
        try {
            const listUser = await this.getAllAvionUseCase.run()
            if(listUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        listUser
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: "avion not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the user."
            });
        }
    }
}