import { Request, Response } from "express";
import { GetAllVuelosUseCase } from "../../appicaition/getallVuelosUsecase";


export class GetAllVuelosController{
    constructor(private getAllVuelosUseCase: GetAllVuelosUseCase){};


    async run(req:Request, res:Response){
        try {
            const list = await this.getAllVuelosUseCase.run()
            if(list){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        list
                    }
                })
            }else{
                return res.status(200).send({
                    status: "ok",
                    message: " not found"
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred 500"
            });
        }
    }
}