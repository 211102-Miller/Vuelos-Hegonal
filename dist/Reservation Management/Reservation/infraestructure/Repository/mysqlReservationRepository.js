"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresReservationRepository = void 0;
const postgresql_1 = require("../../../../database/postgresql");
class PostgresReservationRepository {
    createReservation(reservation) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield (0, postgresql_1.query)(sql, params);
                // Retrieve additional information
                const userData = yield (0, postgresql_1.query)("SELECT name, lastName FROM users WHERE uuid = $1", [userReservation.uuidUser]);
                const seatData = yield (0, postgresql_1.query)("SELECT name, type, description FROM asiento WHERE uuid = $1", [userReservation.uuidAsiento]);
                const flightData = yield (0, postgresql_1.query)("SELECT origin, destination, date_init, date_end, price FROM vuelos WHERE uuid = $1", [userReservation.uuidVueloIda]);
                let returnFlightData = null;
                if (userReservation.uuidVueloRegreso) {
                    returnFlightData = yield (0, postgresql_1.query)("SELECT origin, destination, date_init, date_end, price FROM vuelos WHERE uuid = $1", [userReservation.uuidVueloRegreso]);
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
            }
            catch (error) {
                console.error("Error creating reservation in PostgreSQL:", error);
                throw new Error("Error creating reservation in PostgreSQL");
            }
        });
    }
    createReservations(reservations) {
        return __awaiter(this, void 0, void 0, function* () {
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
                yield (0, postgresql_1.query)(sqlUserReservation, paramsUserReservation);
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
                    yield (0, postgresql_1.query)(sqlAcompanante, paramsAcompanante);
                }
                return reservations;
            }
            catch (error) {
                console.error("Error creating reservations in PostgreSQL:", error);
                throw new Error("Error creating reservations in PostgreSQL");
            }
        });
    }
}
exports.PostgresReservationRepository = PostgresReservationRepository;
