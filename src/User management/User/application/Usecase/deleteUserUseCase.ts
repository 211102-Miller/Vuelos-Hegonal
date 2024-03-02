import { User } from "../../domain/Entity/User";
import { UserInterface } from "../../domain/Port/UserInterface";
import { ValidatorIdentificador } from "../../domain/validation/userValidator";
import { validate } from "class-validator";
export class DeleteUserUseCase{
    constructor(readonly userInterface: UserInterface){}

    async run(uuid:string):Promise<User | string | null | any>{

        let post = new ValidatorIdentificador(uuid)
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const userDelete = await this.userInterface.deleteUser(uuid);
            return userDelete;

        } catch (error) {
            return null;
        }
    }
}