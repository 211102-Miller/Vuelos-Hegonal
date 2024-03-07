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
exports.CreateAvionController = void 0;
const avion_1 = require("../../domina/avion");
class CreateAvionController {
    constructor(createAvionUsecase) {
        this.createAvionUsecase = createAvionUsecase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('controller');
            try {
                let { name, model, capacity, airline } = req.body;
                console.log(req.body);
                let posh = yield this.createAvionUsecase.run(name, model, capacity, airline);
                if (posh instanceof avion_1.Avion) {
                    return res.status(201).send({
                        status: "succes",
                        data: {
                            id: posh.uuid,
                            name: posh.name,
                            model: posh.model,
                            capacity: posh.capacity,
                            airline: posh.airline
                        }
                    });
                }
                else {
                    return res.status(500).send({
                        status: "error",
                        message: "An unexpected error occurred while register the avion."
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
exports.CreateAvionController = CreateAvionController;
