import { User } from "../../domain/Entity/User";
import { UserInterface } from "../../domain/Port/UserInterface";
import { Contact } from "../../domain/Entity/Contac";
import { ValidatorUpdate } from "../../domain/validation/userValidator";
import { validate } from "class-validator";

export class UpdateUserUseCase{
    constructor(readonly userInterface:UserInterface){}

    async run(uuid:string, contact: any):Promise<User | any>{

        let post = new ValidatorUpdate( uuid, contact.name, contact.lastName, contact.cellphone);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            const update = new Contact(contact.name,contact.lastName,contact.cellphone);
            const user = new User(update, null);

            return await this.userInterface.updateUser(uuid,user);
        } catch (error) {
            return null;
        }
    }
}