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
exports.UpdateUserUseCase = void 0;
const User_1 = require("../../domain/Entity/User");
const Contac_1 = require("../../domain/Entity/Contac");
const userValidator_1 = require("../../domain/validation/userValidator");
const class_validator_1 = require("class-validator");
class UpdateUserUseCase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    run(uuid, contact) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = new userValidator_1.ValidatorUpdate(uuid, contact.name, contact.lastName, contact.cellphone);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const update = new Contac_1.Contact(contact.name, contact.lastName, contact.cellphone);
                const user = new User_1.User(update, null);
                return yield this.userInterface.updateUser(uuid, user);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
