"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorUpdate = exports.ValidatorId = exports.ValidatorCreate = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
class ValidatorCreate {
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
exports.ValidatorCreate = ValidatorCreate;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)((value) => value.value ? new Date(value.value) : null, { toClassOnly: true }),
    __metadata("design:type", Date)
], ValidatorCreate.prototype, "date_init", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)((value) => value.value ? new Date(value.value) : null, { toClassOnly: true }),
    __metadata("design:type", Date)
], ValidatorCreate.prototype, "date_end", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ValidatorCreate.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["lleno", "en vuelo", "finalizado", "abordando"]),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidatorCreate.prototype, "avion_uuid", void 0);
class ValidatorId {
    constructor(uuid) {
        this.uuid = uuid;
    }
}
exports.ValidatorId = ValidatorId;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorId.prototype, "uuid", void 0);
class ValidatorUpdate {
    constructor(uuid, type) {
        this.uuid = uuid;
        this.type = type;
    }
}
exports.ValidatorUpdate = ValidatorUpdate;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_validator_1.IsIn)(["lleno", "en vuelo", "finalizado", "abordando"]),
    __metadata("design:type", String)
], ValidatorUpdate.prototype, "type", void 0);
