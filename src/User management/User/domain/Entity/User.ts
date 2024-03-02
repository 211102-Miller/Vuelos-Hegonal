import { Contact } from "./Contac";
import { Credential } from "./Credential";
import { v4 as uuid } from "uuid";

export class User{

    public uuid: string;
    public contact : Contact;
    public credential: Credential;


    constructor(
        contact:Contact,
        credential:Credential
    ){
        this.uuid = this.generateUuid();
        this.contact = contact;
        this.credential = credential;
    }

    generateUuid():string{
        const miuuid = uuid(); // genera el uuid del usuario
        return miuuid;
    }


}