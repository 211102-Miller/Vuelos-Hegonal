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
exports.CreateVuelosController = void 0;
const vuelos_1 = require("../../domina/vuelos");
class CreateVuelosController {
    constructor(createVuelosUsecase) {
        this.createVuelosUsecase = createVuelosUsecase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { origin, destination, state, city, date_init, date_end, price, status, avion_uuid } = req.body;
                console.log(req.body);
                let posh = yield this.createVuelosUsecase.run(origin, destination, state, city, date_init, date_end, price, status, avion_uuid);
                if (posh instanceof vuelos_1.Vuelos) {
                    return res.status(201).send({
                        status: "succes",
                        data: {
                            id: posh.uuid,
                            origin: posh.origin,
                            destination: posh.destination,
                            state: posh.state,
                            city: posh.avion_uuid,
                            date_init: posh.date_init,
                            date_end: posh.date_end,
                            price: posh.price,
                            status: posh.status,
                            avion_uuid: posh.avion_uuid
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while register"
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
                return res.status(500).send({
                    status: "error",
                    message: "An unexpected error occurred. Please try again later.",
                });
            }
        });
    }
}
exports.CreateVuelosController = CreateVuelosController;
