import { query } from "../../../../database/mysql";
import { ReservationInterface } from "../../domain/Port/reservationInterface";
import { Reservation } from "../../domain/Entity/reservation";
import { Reservations } from "../../domain/Entity/reservations";

export class MysqlReservationRepository implements ReservationInterface {

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
            let types = [
                reservation.uuid, 
                userReservation.typeEquipaje, 
                userReservation.typeVuelo,

            ]
            // Devolver los datos
            return {
                reservation: types,
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

    async createReservations(reservations: Reservations): Promise<Reservations | any> {
        try {
            const { userReservation, acompanantes } = reservations;
    
            // Insertar la reserva principal
            const sqlUserReservation = "INSERT INTO reservation (uuid, uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje) VALUES (?, ?, ?, ?, ?, ?, ?)";
            const paramsUserReservation = [
                reservations.uuid,
                userReservation.uuidUser,
                userReservation.uuidAsiento,
                userReservation.uuidVueloIda,
                userReservation.uuidVueloRegreso,
                userReservation.typeVuelo,
                userReservation.typeEquipaje
            ];
            await query(sqlUserReservation, paramsUserReservation);
    
            for (const acompanante of acompanantes) {
                const sqlAcompanante = "INSERT INTO companion (uuid, uuidReservation, uuidAsiento, name, lastName, typeEquipaje) VALUES (?, ?, ?, ?, ?, ?)";
                const paramsAcompanante = [
                    reservations.uuidAcompanantes[acompanantes.indexOf(acompanante)], // Usar el UUID correspondiente
                    reservations.uuid,
                    acompanante.uuidAsiento,
                    acompanante.name,
                    acompanante.lastName,
                    acompanante.typeEquipaje
                ];
                console.log('Parámetros de acompañante:', paramsAcompanante);
                await query(sqlAcompanante, paramsAcompanante);
            }
    
            return reservations;
        } catch (error) {
            console.error("Error al crear las reservaciones en MySQL:", error);
            throw new Error("Error al crear las reservaciones en MySQL");
        }
    }
    
    


}
