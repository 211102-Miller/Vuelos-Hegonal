import { UserReservation } from "./userReservation";
import { v4 as uuid } from "uuid";

export class Reservation{
    public uuid:string;
    public userReservation: UserReservation;


    constructor(
        userReservation:UserReservation
    ){
        this.uuid = this.generateUuid();
        this.userReservation = userReservation;
    }

    generateUuid():string{
        const miuuid = uuid(); // genera el uuid del usuario
        return miuuid;
    }
}


