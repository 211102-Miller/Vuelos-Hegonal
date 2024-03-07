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
exports.CreateReservationsUseCase = void 0;
const userReservation_1 = require("../../domain/Entity/userReservation");
const acompanante_1 = require("../../domain/Entity/acompanante");
const reservations_1 = require("../../domain/Entity/reservations");
class CreateReservationsUseCase {
    constructor(reservationInterface) {
        this.reservationInterface = reservationInterface;
    }
    run({ uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje }, acompanantesData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userReservation = new userReservation_1.UserReservation(uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje);
                const acompanantes = acompanantesData.map(acomp => new acompanante_1.Acompanante(acomp.uuidAsientoAcompa, acomp.name, acomp.lastName, acomp.typeEquipajeAcompa));
                const reservations = new reservations_1.Reservations(userReservation, acompanantes);
                return yield this.reservationInterface.createReservations(reservations);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateReservationsUseCase = CreateReservationsUseCase;
