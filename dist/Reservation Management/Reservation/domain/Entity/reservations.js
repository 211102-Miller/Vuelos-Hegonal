"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservations = void 0;
const uuid_1 = require("uuid");
class Reservations {
    constructor(userReservation, acompanantes) {
        this.uuid = this.generateUuid();
        this.uuidAcompanantes = this.generateUuids(acompanantes.length); // Cambio aquí
        this.userReservation = userReservation;
        this.acompanantes = acompanantes;
    }
    generateUuid() {
        const miuuid = (0, uuid_1.v4)();
        return miuuid;
    }
    generateUuids(count) {
        const uuids = [];
        for (let i = 0; i < count; i++) {
            uuids.push((0, uuid_1.v4)());
        }
        return uuids;
    }
}
exports.Reservations = Reservations;
