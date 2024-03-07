import { PosgresAvionRepository } from "./PosgreslAvionRepository";

import { CreateAvionUsecase } from "../appicaition/createAvionUseCase";
import { CreateAvionController } from "./controller/createAvioncontroller";

import { GetAllAvionUseCase } from "../appicaition/getallAvionUsecase";
import { GetAllAvionController } from "./controller/getAllAvionController";

import { GetByIdCoontroller } from "./controller/getidAvionController";
import { GetByIdUseCase } from "../appicaition/getidAvionUsecase";

import { DeleteAvionController } from "./controller/deliteAvionController";
import { DeleteAvionUseCase } from "../appicaition/deliteAvionUseCase";

import { UpdateAvionByIdUseCase } from "../appicaition/updateAvionUsecase";
import { UpdateAvionIdController } from "./controller/updateAvioncontroller";

export const posgresAvionRepository = new PosgresAvionRepository();

export const createAvionUsecase = new CreateAvionUsecase(posgresAvionRepository)
export const createvuelocontroller = new CreateAvionController(createAvionUsecase)

export const getAllAvionUseCase = new GetAllAvionUseCase(posgresAvionRepository)
export const getAllVueloController = new GetAllAvionController(getAllAvionUseCase)

export const getByIdUseCase = new GetByIdUseCase(posgresAvionRepository)
export const getByIdCoontroller = new GetByIdCoontroller(getByIdUseCase)

export const deleteAvionUseCase = new DeleteAvionUseCase(posgresAvionRepository)
export const deleteAvionController = new DeleteAvionController(deleteAvionUseCase)

export const updateAvionUsecase = new UpdateAvionByIdUseCase(posgresAvionRepository)
export const updateAvioncontroller = new UpdateAvionIdController(updateAvionUsecase)