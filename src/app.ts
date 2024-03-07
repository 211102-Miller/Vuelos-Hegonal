import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import { AvionRoutes } from "./Vuelos management/avion/infraestructure/avionRoutes";
import { AsientoRoutes } from "./Vuelos management/Asiento/infraestructure/asientoRoutes";
import { VueloRoutes } from "./Vuelos management/Vuelos/infraestructure/vuelosRoutes";
import { UserRouter } from "./User management/User/infraestructure/Route/UserRouter";
import { reservationRoute } from "./Reservation Management/Reservation/infraestructure/Route/repositoryRoute";




const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/avion',AvionRoutes);
app.use('/api/v1/Asiento',AsientoRoutes);
app.use('/api/v1/vuelos',VueloRoutes);
app.use('/api/v1/users',UserRouter);
app.use('/api/v1/reservation',reservationRoute);



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});