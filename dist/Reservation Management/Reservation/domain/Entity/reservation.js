"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const uuid_1 = require("uuid");
class Reservation {
    constructor(userReservation) {
        this.uuid = this.generateUuid();
        this.userReservation = userReservation;
    }
    generateUuid() {
        const miuuid = (0, uuid_1.v4)(); // genera el uuid del usuario
        return miuuid;
    }
}
exports.Reservation = Reservation;
