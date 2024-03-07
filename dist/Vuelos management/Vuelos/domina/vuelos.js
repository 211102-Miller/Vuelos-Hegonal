"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vuelos = void 0;
class Vuelos {
    constructor(uuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid) {
        this.uuid = uuid;
        this.origin = origin;
        this.destination = destination;
        this.state = state;
        this.city = city;
        this.date_init = date_init;
        this.date_end = date_end;
        this.price = price;
        this.status = status;
        this.avion_uuid = avion_uuid;
    }
}
exports.Vuelos = Vuelos;
