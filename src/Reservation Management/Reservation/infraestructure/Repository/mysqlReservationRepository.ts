import { query } from "../../../../database/mysql";
import { ReservationInterface } from "../../domain/Port/reservationInterface";
import { Reservation } from "../../domain/Entity/reservation";

export class MysqlReservationRepository implements ReservationInterface{

    async createReservation(reservation: Reservation): Promise<any> {
        try {
            const { userReservation } = reservation;
            
            // Insertar la reserva en la tabla 'reservation'
            const sql = "INSERT INTO reservation (uuid, uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const params = [
                reservation.uuid,
                userReservation.uuidUser,
                userReservation.uuidAsiento,
                userReservation.uuidVueloIda,
                userReservation.uuidVueloRegreso,
                userReservation.typeVuelo,
                userReservation.typeEquipaje
            ];
            await query(sql, params);
            
            // Recuperar información adicional
            const userData = await query("SELECT name, lastName FROM users WHERE uuid = ?", [userReservation.uuidUser]);
            const seatData = await query("SELECT name, type, description FROM asiento WHERE uuid = ?", [userReservation.uuidAsiento]);
            const flightData = await query("SELECT origin, destination, date_init, date_end, price FROM vuelos WHERE uuid = ?", [userReservation.uuidVueloIda]);
            let returnFlightData = null;
            if (userReservation.uuidVueloRegreso) {
                returnFlightData = await query("SELECT origin, destination, date_init, date_end, price FROM vuelos WHERE uuid = ?", [userReservation.uuidVueloRegreso]);
            }
            
            //Devuelve ciertos datos
            let types = [reservation.uuid,userReservation.typeEquipaje,userReservation.typeVuelo]
            // Devolver los datos
            return {
                reservation:types,
                user: userData[0],
                seat: seatData[0],
                flight: flightData[0],
                returnFlight: returnFlightData ? returnFlightData[0] : null
            };
        } catch (error) {
            console.error("Error al crear la reservación en MySQL:", error);
            throw new Error("Error al crear la reservación en MySQL");
        }
    }

}
