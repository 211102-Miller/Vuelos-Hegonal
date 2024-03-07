import { ReservationInterface } from "../../domain/Port/reservationInterface";
import { UserReservation } from "../../domain/Entity/userReservation";
import { Acompanante } from "../../domain/Entity/acompanante";
import { Reservations } from "../../domain/Entity/reservations";

export class CreateReservationsUseCase {
    constructor(readonly reservationInterface: ReservationInterface) {}

    async run(
        {uuidUser,uuidAsiento,uuidVueloIda,uuidVueloRegreso,typeVuelo,typeEquipaje},
        acompanantesData: any[]
    ): Promise<Reservations | any> {
        try {
            const userReservation = new UserReservation(uuidUser,uuidAsiento,uuidVueloIda,uuidVueloRegreso,typeVuelo,typeEquipaje);
            const acompanantes = acompanantesData.map(acomp => new Acompanante(acomp.uuidAsientoAcompa, acomp.name, acomp.lastName, acomp.typeEquipajeAcompa));
            const reservations = new Reservations(userReservation, acompanantes);

            return await this.reservationInterface.createReservations(reservations);
        } catch (error) {
            return null;
        }
    }
}
