import express from 'express';
import { createAsientocontroller,
    getAllAsientoController,
    getByIdCoontroller,
    updateAsientocontroller,
    deleteAsientoUseCase,
    
} from './depencies';

export const AsientoRoutes = express.Router();


AsientoRoutes.post("/", createAsientocontroller.run.bind(createAsientocontroller))

AsientoRoutes.get("/", getAllAsientoController.run.bind(getAllAsientoController));

AsientoRoutes.get("/:uuid", getByIdCoontroller.run.bind(getByIdCoontroller))

AsientoRoutes.put("/:uuid", updateAsientocontroller.run.bind(updateAsientocontroller))

AsientoRoutes.delete("/:uuid", deleteAsientoUseCase.run.bind(deleteAsientoUseCase))
