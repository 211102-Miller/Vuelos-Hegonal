import { User } from "../../domain/Entity/User";
import { Contact } from "../../domain/Entity/Contac";
import { Credential } from "../../domain/Entity/Credential";
import { UserInterface } from "../../domain/Port/UserInterface";
import { encrypt } from "../../../../helpers/ashs";
import { ValidatorRegisterUser } from "../../domain/validation/userValidator";
import { validate } from "class-validator";

export class RegisterUserUseCase{

    constructor(readonly userInterface:UserInterface){}

    async run(
        name:string,
        lastName:string, 
        cellphone:string,
        email:string,
        password:string
    ):Promise<User | any>{

        const hashPassword = await encrypt(password); // se encripta la contraseña

        let post = new ValidatorRegisterUser( name, lastName, cellphone, email, password);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }

        try {
            let contact = new Contact(name,lastName,cellphone);
            let credential = new Credential(email,hashPassword);
            let user = new User(contact,credential);

            return await this.userInterface.registerUser(user)
            
            
        } catch (error) {
            return null;
        }
    }
}