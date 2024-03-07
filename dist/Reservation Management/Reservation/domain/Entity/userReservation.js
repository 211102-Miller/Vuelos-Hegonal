"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserReservation = void 0;
class UserReservation {
    constructor(uuidUser, uuidAsiento, uuidVueloIda, uuidVueloRegreso, typeVuelo, typeEquipaje) {
        this.uuidUser = uuidUser;
        this.uuidAsiento = uuidAsiento;
        this.uuidVueloIda = uuidVueloIda;
        this.uuidVueloRegreso = uuidVueloRegreso;
        this.typeVuelo = typeVuelo;
        this.typeEquipaje = typeEquipaje;
    }
}
exports.UserReservation = UserReservation;
