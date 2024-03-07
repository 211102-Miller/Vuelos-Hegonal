import { Request, Response } from "express";
import { GetAllAsientoUseCase } from "../../appicaition/getallAsientoUsecase";


export class GetAllAsientoController{
    constructor(private getAllAsientoUseCase: GetAllAsientoUseCase){};


    async run(req:Request, res:Response){
        try {
            const list = await this.getAllAsientoUseCase.run()
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