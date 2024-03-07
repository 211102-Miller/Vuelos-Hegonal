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
exports.CreateVuelosUsecase = void 0;
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
const vuelos_1 = require("../domina/validation/vuelos");
class CreateVuelosUsecase {
    constructor(vuelosRepository) {
        this.vuelosRepository = vuelosRepository;
    }
    run(origin, destination, state, city, date_init, date_end, price, status, avion_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const myuuid = (0, uuid_1.v4)();
            let post = new vuelos_1.ValidatorCreate(myuuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid);
            const validation = yield (0, class_validator_1.validate)(post);
            if (validation.length > 0) {
                throw new Error(JSON.stringify(validation));
            }
            try {
                const create = yield this.vuelosRepository.create(myuuid, origin, destination, state, city, date_init, date_end, price, status, avion_uuid);
                return create;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.CreateVuelosUsecase = CreateVuelosUsecase;
