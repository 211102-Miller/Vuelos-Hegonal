"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
class Contact {
    constructor(name, lastName, cellphone) {
        this.name = name;
        this.lastName = lastName;
        this.cellphone = cellphone;
        this.fullName = name + " " + lastName;
    }
    getFullName() {
        return this.fullName;
    }
}
exports.Contact = Contact;
