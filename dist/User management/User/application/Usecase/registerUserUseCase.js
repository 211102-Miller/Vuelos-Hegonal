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
exports.RegisterUserUseCase = void 0;
const User_1 = require("../../domain/Entity/User");
const Contac_1 = require("../../domain/Entity/Contac");
const Credential_1 = require("../../domain/Entity/Credential");
const ashs_1 = require("../../../../helpers/ashs");
const userValidator_1 = require("../../domain/validation/userValidator");
const class_validator_1 = require("class-validator");
class RegisterUserUseCase {
    constructor(userInterface) {
        this.userInterface = userInterface;
    }
    run(name, lastName, cellphone, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield (0, ashs_1.encrypt)(password); // se encripta la contraseña
            let post = new userValidator_1.ValidatorRegisterUser(name, lastName, cellphone, email, password);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                let contact = new Contac_1.Contact(name, lastName, cellphone);
                let credential = new Credential_1.Credential(email, hashPassword);
                let user = new User_1.User(contact, credential);
                return yield this.userInterface.registerUser(user);
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
