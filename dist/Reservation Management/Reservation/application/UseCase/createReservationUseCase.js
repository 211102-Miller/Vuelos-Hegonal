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
exports.CreateReservationUseCase = void 0;
const userReservation_1 = require("../../domain/Entity/userReservation");
const reservation_1 = require("../../domain/Entity/reservation");
const reservationValidation_1 = require("../../domain/validations/reservationValidation");
const class_validator_1 = require("class-validator");
class CreateReservationUseCase {
    constructor(reservationInterface) {
        this.reservationInterface = reservationInterface;
    }
    run({ uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje }) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = new reservationValidation_1.ValidatorCreate(uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const userReservation = new userReservation_1.UserReservation(uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje);
                const reservation = new reservation_1.Reservation(userReservation);
                return yield this.reservationInterface.createReservation(reservation);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateReservationUseCase = CreateReservationUseCase;
