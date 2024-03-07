"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const signale_1 = require("signale");
const avionRoutes_1 = require("./Vuelos management/avion/infraestructure/avionRoutes");
const asientoRoutes_1 = require("./Vuelos management/Asiento/infraestructure/asientoRoutes");
const vuelosRoutes_1 = require("./Vuelos management/Vuelos/infraestructure/vuelosRoutes");
const UserRouter_1 = require("./User management/User/infraestructure/Route/UserRouter");
const repositoryRoute_1 = require("./Reservation Management/Reservation/infraestructure/Route/repositoryRoute");
const app = (0, express_1.default)();
const signale = new signale_1.Signale();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/avion', avionRoutes_1.AvionRoutes);
app.use('/api/v1/Asiento', asientoRoutes_1.AsientoRoutes);
app.use('/api/v1/vuelos', vuelosRoutes_1.VueloRoutes);
app.use('/api/v1/users', UserRouter_1.UserRouter);
app.use('/api/v1/reservation', repositoryRoute_1.reservationRoute);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});
