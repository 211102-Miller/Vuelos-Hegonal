import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import { UserRouter } from "./User management/User/infraestructure/Route/UserRouter";


const app = express();
const signale = new Signale();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users',UserRouter);


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});