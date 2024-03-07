"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor(contact, credential) {
        this.uuid = this.generateUuid();
        this.contact = contact;
        this.credential = credential;
    }
    generateUuid() {
        const miuuid = (0, uuid_1.v4)(); // genera el uuid del usuario
        return miuuid;
    }
}
exports.User = User;
