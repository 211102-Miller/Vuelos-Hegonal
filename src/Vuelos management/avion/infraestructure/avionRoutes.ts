import express from 'express';
import { createvuelocontroller,
    getAllVueloController,
    getByIdCoontroller,
    updateAvioncontroller,
    deleteAvionUseCase,
    
} from './depencies';

export const AvionRoutes = express.Router();


AvionRoutes.post("/", createvuelocontroller.run.bind(createvuelocontroller))

AvionRoutes.get("/", getAllVueloController.run.bind(getAllVueloController));

AvionRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))

AvionRoutes.put("/:uuid", updateAvioncontroller.run.bind(updateAvioncontroller))

AvionRoutes.delete("/:uuid", deleteAvionUseCase.run.bind(deleteAvionUseCase))
