import express from 'express';
import { createvuelocontroller,
    getAllVueloController,
    getByIdCoontroller,
    updateAvioncontroller,
    deleteAvionUseCase,
    
} from './depencies';

export const VueloRoutes = express.Router();


VueloRoutes.post("/", createvuelocontroller.run.bind(createvuelocontroller))

VueloRoutes.get("/", getAllVueloController.run.bind(getAllVueloController));

VueloRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))

VueloRoutes.put("/:uuid", updateAvioncontroller.run.bind(updateAvioncontroller))

VueloRoutes.delete("/:uuid", deleteAvionUseCase.run.bind(deleteAvionUseCase))
