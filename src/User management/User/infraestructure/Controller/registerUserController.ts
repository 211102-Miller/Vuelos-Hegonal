import { RegisterUserUseCase } from "../../application/Usecase/registerUserUseCase";
import { Request, Response } from "express";
import { User } from "../../domain/Entity/User";


export class RegisterUserController {
    constructor(readonly registerUserUseCase: RegisterUserUseCase) { }

    async run(req: Request, res: Response) {

        let { name, lastName, cellphone, email, password } = req.body;

        try {

            let user = await this.registerUserUseCase.run(name, lastName, cellphone, email, password);

            if (user instanceof User) {
                return res.status(201).send({
                    status: "succes",
                    data: {
                        uuid: user.uuid,
                        name: user.contact.name,
                        email: user.credential.email,
                    }
                });
            }else{
                return res.status(404).send({
                    status: "error",
                    message: "Error create the user."
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
                message: "An error occurred while create the user."
            });
        }
    }
}