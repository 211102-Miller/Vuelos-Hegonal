"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asiento = void 0;
class Asiento {
    constructor(uuid, name, type, description, avion_uuid) {
        this.uuid = uuid;
        this.name = name;
        this.type = type;
        this.description = description;
        this.avion_uuid = avion_uuid;
    }
}
exports.Asiento = Asiento;
