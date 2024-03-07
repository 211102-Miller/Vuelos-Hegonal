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
exports.CreateAvionUsecase = void 0;
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const avion_1 = require("../domina/validation/avion");
class CreateAvionUsecase {
    constructor(avionRepository) {
        this.avionRepository = avionRepository;
    }
    run(name, model, capacity, airline) {
        return __awaiter(this, void 0, void 0, function* () {
            const myuuid = (0, uuid_1.v4)();
            let post = new avion_1.ValidatorCreate(myuuid, name, model, capacity, airline);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const createUser = yield this.avionRepository.createAvion(myuuid, name, model, capacity, airline);
                return createUser;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateAvionUsecase = CreateAvionUsecase;
