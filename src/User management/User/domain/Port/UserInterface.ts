import { User } from "../Entity/User";

export interface UserInterface{

    registerUser(user:User):Promise<User>

    loginUser(email:string,password:string):  Promise<User | any>

    updateUser( uuid:string , user:User):Promise<User| null | any>;

    deleteUser(uuid:string):Promise<User | null | any | string>
}