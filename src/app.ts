import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import { AvionRoutes } from "./avion/infraestructure/avionRoutes";
import { AsientoRoutes } from "./Asiento/infraestructure/asientoRoutes";
import { VueloRoutes } from "./Vuelos/infraestructure/vuelosRoutes";


const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/avion',AvionRoutes);
app.use('/api/v1/Asiento',AsientoRoutes);
app.use('/api/v1/vuelos',VueloRoutes);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});