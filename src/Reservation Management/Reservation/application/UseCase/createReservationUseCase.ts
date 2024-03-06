import { ReservationInterface } from "../../domain/Port/reservationInterface";
import { UserReservation } from "../../domain/Entity/userReservation";
import { Reservation } from "../../domain/Entity/reservation";
import { ValidatorCreate } from "../../domain/validations/reservationValidation";
import { validate } from "class-validator";

export class CreateReservationUseCase{
    constructor(readonly reservationInterface:ReservationInterface){}

    async run({uuidUser,uuidAsiento,uuidVueloIda,uuidVueloRegreso,typeVuelo,typeEquipaje}):Promise<Reservation | any>{
        
        let post = new ValidatorCreate( uuidUser,uuidAsiento,uuidVueloIda,uuidVueloRegreso,typeVuelo,typeEquipaje);
        const validation = await validate(post)
        if (validation.length > 0) {
            throw new Error(JSON.stringify(validation));
        }
        try {
            const userReservation = new UserReservation(
                uuidUser,
                uuidAsiento,
                uuidVueloIda,
                uuidVueloRegreso,
                typeVuelo,
                typeEquipaje
            )
            const reservation = new Reservation(userReservation);

            return await this.reservationInterface.createReservation(reservation);
        } catch (error) {
            return null;
        }
    }
}