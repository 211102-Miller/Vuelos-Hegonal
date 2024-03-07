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
exports.CreateReservationsController = void 0;
class CreateReservationsController {
    constructor(createReservationsUseCase) {
        this.createReservationsUseCase = createReservationsUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje, acompanantes } = req.body;
                const userReservationData = {
                    uuidUser,
                    uuidAsiento,
                    uuidVueloIda,
                    uuidVueloRegreso,
                    typeVuelo,
                    typeEquipaje
                };
                const reservations = yield this.createReservationsUseCase.run(userReservationData, acompanantes);
                if (reservations) {
                    return res.status(201).send({
                        status: "success",
                        reservations
                    });
                }
                else {
                    return res.status(404).send({
                        status: "error",
                        message: "Error creating the Reservation."
                    });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while creating the reservation."
                });
            }
        });
    }
}
exports.CreateReservationsController = CreateReservationsController;
