import { UserReservation } from "./userReservation";
import { Acompanante } from "./acompanante";
import { v4 as uuid } from "uuid";

export class Reservations {
    public uuid: string;
    public uuidAcompanantes: string[]; // Cambio aquí
    public userReservation: UserReservation;
    public acompanantes: Acompanante[];

    constructor(
        userReservation: UserReservation,
        acompanantes: Acompanante[]
    ) {
        this.uuid = this.generateUuid();
        this.uuidAcompanantes = this.generateUuids(acompanantes.length); // Cambio aquí
        this.userReservation = userReservation;
        this.acompanantes = acompanantes;
    }

    generateUuid(): string {
        const miuuid = uuid();
        return miuuid;
    }

    generateUuids(count: number): string[] { // Método para generar múltiples UUIDs
        const uuids: string[] = [];
        for (let i = 0; i < count; i++) {
            uuids.push(uuid());
        }
        return uuids;
    }
}
