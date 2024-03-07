import { query } from "../../../../database/postgresql";
import { ReservationInterface } from "../../domain/Port/reservationInterface";
import { Reservation } from "../../domain/Entity/reservation";
import { Reservations } from "../../domain/Entity/reservations";

export class PostgresReservationRepository implements ReservationInterface {

    async createReservation(reservation: Reservation): Promise<any> {
        try {
            const { userReservation } = reservation;

            // Insert the reservation into the 'reservation' table
            const sql = "INSERT INTO reservation (uuid, uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje) VALUES ($1, $2, $3, $4, $5, $6, $7)";
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

            // Retrieve additional information
            const userData = await query("SELECT name, lastName FROM users WHERE uuid = $1", [userReservation.uuidUser]);
            const seatData = await query("SELECT name, type, description FROM asiento WHERE uuid = $1", [userReservation.uuidAsiento]);
            const flightData = await query("SELECT origin, destination, date_init, date_end, price FROM vuelos WHERE uuid = $1", [userReservation.uuidVueloIda]);
            let returnFlightData = null;
            if (userReservation.uuidVueloRegreso) {
                returnFlightData = await query("SELECT origin, destination, date_init, date_end, price FROM vuelos WHERE uuid = $1", [userReservation.uuidVueloRegreso]);
            }

            // Return specific data
            let types = [
                reservation.uuid, 
                userReservation.typeEquipaje, 
                userReservation.typeVuelo,
            ];
            // Return the data
            return {
                reservation: types,
                user: userData[0],
                seat: seatData[0],
                flight: flightData[0],
                returnFlight: returnFlightData ? returnFlightData[0] : null
            };
        } catch (error) {
            console.error("Error creating reservation in PostgreSQL:", error);
            throw new Error("Error creating reservation in PostgreSQL");
        }
    }

    async createReservations(reservations: Reservations): Promise<Reservations | any> {
        try {
            const { userReservation, acompanantes } = reservations;
    
            // Insert the main reservation
            const sqlUserReservation = "INSERT INTO reservation (uuid, uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje) VALUES ($1, $2, $3, $4, $5, $6, $7)";
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
                const sqlAcompanante = "INSERT INTO companion (uuid, uuidReservation, uuidAsiento, name, lastName, typeEquipaje) VALUES ($1, $2, $3, $4, $5, $6)";
                const paramsAcompanante = [
                    reservations.uuidAcompanantes[acompanantes.indexOf(acompanante)], // Use the corresponding UUID
                    reservations.uuid,
                    acompanante.uuidAsiento,
                    acompanante.name,
                    acompanante.lastName,
                    acompanante.typeEquipaje
                ];
                console.log('Companion parameters:', paramsAcompanante);
                await query(sqlAcompanante, paramsAcompanante);
            }
    
            return reservations;
        } catch (error) {
            console.error("Error creating reservations in PostgreSQL:", error);
            throw new Error("Error creating reservations in PostgreSQL");
        }
    }
}
